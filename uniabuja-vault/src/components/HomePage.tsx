import { useState, useEffect } from "react"
import { Header } from "./Header"
import { Explore } from "./Explore"
import type { CourseTypes } from "./data"
import { UploadForm } from "./UploadForm"
import { MustSignIn } from "./MustSignIn"
import { SignIn } from "./SignIn"
import { SignUp } from "./SignUp"
import { ProfilePage } from "./ProfilePage"
import { AdminPage } from "./AdminPage"

type View = 'explore' | 'upload' | 'signin' | 'signup' | 'profile' | 'admin';
type HeaderView = 'explore' | 'upload' | 'profile' | 'admin';
type AuthUser = { id: string; name: string; matricNumber: string; role?: string };

const API_BASE_URL = "https://uniabuja-vault-api.ichapijeff.workers.dev";

export function HomePage(){
    const [activeView, setActiveView] = useState<View>('explore')
    const [courses, setCourses] = useState<CourseTypes[]>([])
    const [user, setUser] = useState<AuthUser | null>(null)

    const isSignedIn = !!user
    const isAdmin = user?.role?.toLowerCase() === 'admin'

    // Fetch live PDFs directly from Cloudflare D1
    const fetchCourses = () => {
        fetch(`${API_BASE_URL}/api/courses`)
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Failed to load courses:", err));
            
    };

    useEffect(() => {
        fetchCourses();
    }, [activeView]);

    const headerActiveView: HeaderView =
        activeView === 'signin' || activeView === 'signup'? 'upload' :
        (activeView as HeaderView);

    const handleHeaderNav = (v: HeaderView) => {
        setActiveView(v);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header 
                activeView={headerActiveView} 
                setActiveView={handleHeaderNav} 
                isSignedIn={isSignedIn} 
                isAdmin={isAdmin} 
            />
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {activeView === 'explore' && <Explore courses={courses} setCourses={setCourses} />}

                {activeView === 'upload' && (isSignedIn? <UploadForm />
                 : <MustSignIn 
                        onSignInClick={() => setActiveView('signin')} 
                        onCreateAccountClick={() => setActiveView('signup')} 
                    />
                )}
                {activeView === 'signin' && 
                    <SignIn 
                        
                        onSignInSuccess={(loggedInUser) => { 
                            setUser(loggedInUser); 
                            setActiveView('upload');
                         }} 
                         onCreateAccountClick={() => setActiveView('signup')} 
                    />
                }
                {activeView === 'signup' && 
                    <SignUp 
                        onBack={() => setActiveView('explore')} 
                        onSignInClick={() => setActiveView('signin')} 
                        onSignUpSuccess={(newUser) => { setUser(newUser); setActiveView('upload'); }} 
                    />
                }
                {activeView === 'profile' && 
                (isSignedIn? 
                    <ProfilePage 
                        onSignOut={() => { setUser(null); setActiveView('explore'); }} 
                        onUploadClick={() => setActiveView('upload')} 
                    /> 
                :   <MustSignIn 
                        onSignInClick={() => setActiveView('signin')} 
                        onCreateAccountClick={() => setActiveView('signup')} 
                    />
                )}
                {activeView === 'admin' && (
                    isAdmin
                        ? <AdminPage />
                        : <p className="text-center text-gray-500 py-10">You need admin access to view this page.</p>
                )}
            </main>
        </div>
    )
}