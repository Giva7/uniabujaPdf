import { useState } from "react";
import { Eye, EyeOff, LogIn, GraduationCap, ArrowLeft } from "lucide-react";



type Props = {
  onBack?: () => void;
  onSignInSuccess?: () => void;
  onCreateAccountClick?: () => void;
}
interface LoginData {
  matric: string;
  password: string;
}


export function SignIn({ onBack, onSignInSuccess, onCreateAccountClick }: Props){
  const [matric, setMatric] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loginInfo: LoginData = { 
      matric: matric, 
      password: password 
    };

    

    



    console.log(loginInfo);
    


    setTimeout(() => {
      setLoading(false);
      onSignInSuccess?.();
    }, 1000);
  };

  
  
  



  return(
    <div className="min-h- flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-md w-full border border-gray-100 relative">
        {onBack && (
          <button onClick={onBack} className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <div className="text-center mb-6 mt-6">
          <div className="bg-linear-to-r from-green-600 to-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Welcome back
            </h2>
            <p className="text-sm text-gray-600">
              Sign in to 
              <span className="font-bold text-green-700">
                UniAbuja Vault
                </span>
            </p>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="space-y-4">
          <div>
            <label 
              className="text-sm font-semibold text-gray-700 mb-1.5 block">
              Matric Number
            </label>
            <input 
              required 
              value={matric} 
              onChange={(e) => setMatric(e.target.value)} 
              placeholder="e.g 2001/12345" 
              className="w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-500 outline-none text-sm sm:text-base" />
          </div>
          <div>
            <label 
              className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Password
            </label>
            <div className="relative">
              <input 
                required 
                type={showPassword? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" 
                className="w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-500 outline-none pr-12 text-sm sm:text-base" />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                  {showPassword? 
                  <EyeOff className="w-5 h-5" /> 
                  : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 sm:py-3 rounded-lg font-semibold disabled:opacity-50 text-sm sm:text-base">
              <LogIn className="w-4 h-4" /> 
              {loading? 'Signing in...' : 'Sign In'}
          </button>
          <div className="text-center text-xs sm:text-sm text-gray-600 pt-4 border-t">
            Don't have an account? 
            <span 
              onClick={onCreateAccountClick} 
              className="font-bold text-green-700 cursor-pointer hover:underline">
                Create account
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}