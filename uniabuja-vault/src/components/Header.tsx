import { Upload, UserCircle, Shield } from "lucide-react";

type Props = {
  activeView: 'explore' | 'upload' | 'profile' | 'admin';
  setActiveView: (v: 'explore' | 'upload' | 'profile' | 'admin') => void;
  isSignedIn?: boolean;
  isAdmin?: boolean;
};

export function Header({ activeView, setActiveView, isSignedIn, isAdmin }: Props) {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-800 text-white shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">UNIABUJA VAULT</h1>
            <p className="text-green-100 text-xs sm:text-sm">Community Learning Platform</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Show Admin Shield ONLY when logged in as Admin */}
            {isAdmin && (
              <button
                onClick={() => setActiveView('admin')}
                className={`p-2 rounded-full transition-colors ${
                  activeView === 'admin' ? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'
                }`}
                title="Admin Dashboard"
              >
                <Shield className="w-6 h-6" />
              </button>
            )}
            {isSignedIn && (
              <button
                onClick={() => setActiveView('profile')}
                className={`p-2 rounded-full transition-colors ${
                  activeView === 'profile' ? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'
                }`}
                title="User Profile"
              >
                <UserCircle className="w-7 h-7" />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveView('explore')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
              activeView === 'explore' ? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveView('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
              activeView === 'upload' ? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Upload className="w-4 h-4" /> Upload
          </button>
          
          {/* Show Admin Nav Link ONLY when logged in as Admin */}
          {isAdmin && (
            <button
              onClick={() => setActiveView('admin')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                activeView === 'admin' ? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Admin
            </button>
          )}

          {isSignedIn && (
            <button
              onClick={() => setActiveView('profile')}
              className={`md:hidden px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                activeView === 'profile' ? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Profile
            </button>
          )}
        </div>

        
      </div>
    </header>
  );
}

/*<div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <Users className="w-5 h-5 mx-auto mb-1" />
            <div className="text-lg sm:text-xl font-bold">500</div>
            <div className="text-xs text-green-100">Students</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <Download className="w-5 h-5 mx-auto mb-1" />
            <div className="text-lg sm:text-xl font-bold">2,000</div>
            <div className="text-xs text-green-100">Downloads</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <FileText className="w-5 h-5 mx-auto mb-1" />
            <div className="text-lg sm:text-xl font-bold">23</div>
            <div className="text-xs text-green-100">PDFs</div>
          </div>
        </div>*/