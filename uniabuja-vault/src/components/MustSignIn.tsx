import { Lock, LogIn, ShieldAlert, FileUp } from "lucide-react";

type Props = {
  onSignInClick?: () => void;
  onCreateAccountClick?: () => void;
}

export function MustSignIn({ onSignInClick, onCreateAccountClick }: Props){
  return(
    <div className="min-h- flex items-center justify-center p-4 sm:p-6 bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-md w-full text-center border border-gray-100">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
          <div className="bg-gradient-to-r from-green-600 to-green-700 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center">
            <FileUp className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-red-500 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
            <Lock className="w-4 h-4 text-white" />
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Sign in required</h2>
        <p className="text-sm text-gray-600 mb-1">You must sign in before you can upload PDFs to</p>
        <p className="font-bold text-green-700 mb-6">UniAbuja Vault</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2 text-left mb-6">
          <ShieldAlert className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-yellow-800">Only verified UniAbuja students can upload materials.</p>
        </div>
        <div className="space-y-3">
          <button onClick={onSignInClick} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 sm:py-3 rounded-lg font-semibold">
            <LogIn className="w-4 h-4" /> Sign in to Upload
          </button>
          <p className="text-xs sm:text-sm text-gray-500">
            Don't have an account? <span onClick={onCreateAccountClick} className="text-green-700 font-semibold cursor-pointer hover:underline">Create one</span> - it takes 30 seconds.
          </p>
        </div>
      </div>
    </div>
  )
}