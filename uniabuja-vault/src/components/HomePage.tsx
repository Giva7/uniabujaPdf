import { useState } from "react"
import { Header } from "./Header"
import { Explore } from "./Explore"
import type { CourseTypes } from "./data"
import { data } from "./data"
import { UploadForm } from "./UploadForm"
import { MustSignIn } from "./MustSignIn"
import { SignIn } from "./SignIn"
import { SignUp } from "./SignUp"
import { ProfilePage } from "./ProfilePage"
import { AdminPage } from "./AdminPage"

type View = 'explore' | 'upload' | 'signin' | 'signup' | 'profile' | 'admin';
type HeaderView = 'explore' | 'upload' | 'profile' | 'admin';

export function HomePage(){
    const [activeView, setActiveView] = useState<View>('explore')
    const [courses, setCourses] = useState<CourseTypes[]>(data)
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [isAdmin] = useState(true) // TODO: check real admin role

    const headerActiveView: HeaderView =
        activeView === 'signin' || activeView === 'signup'? 'upload' :
        (activeView as HeaderView);

    const handleHeaderNav = (v: HeaderView) => {
        setActiveView(v);
    }

    return(
        <div className="min-h-screen bg-gray-50">
            <Header activeView={headerActiveView} setActiveView={handleHeaderNav} isSignedIn={isSignedIn} isAdmin={isAdmin} />
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {activeView === 'explore' && <Explore courses={courses} setCourses={setCourses} />}
                {activeView === 'upload' && (isSignedIn? <UploadForm /> : <MustSignIn onSignInClick={() => setActiveView('signin')} onCreateAccountClick={() => setActiveView('signup')} />)}
                {activeView === 'signin' && <SignIn onBack={() => setActiveView('explore')} onSignInSuccess={() => { setIsSignedIn(true); setActiveView('upload'); }} onCreateAccountClick={() => setActiveView('signup')} />}
                {activeView === 'signup' && <SignUp onBack={() => setActiveView('explore')} onSignInClick={() => setActiveView('signin')} onSignUpSuccess={() => { setIsSignedIn(true); setActiveView('upload'); }} />}
                {activeView === 'profile' && (isSignedIn? <ProfilePage onSignOut={() => { setIsSignedIn(false); setActiveView('explore'); }} onUploadClick={() => setActiveView('upload')} /> : <MustSignIn onSignInClick={() => setActiveView('signin')} onCreateAccountClick={() => setActiveView('signup')} />)}
                {activeView === 'admin' && <AdminPage />}
            </main>
        </div>
    )
}