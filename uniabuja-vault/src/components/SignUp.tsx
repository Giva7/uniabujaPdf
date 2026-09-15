import { Eye, EyeOff, UserPlus, GraduationCap, ArrowLeft } from "lucide-react";
import { useState } from "react";

type Props = {
  onBack?: () => void;
  onSignInClick?: () => void;
  onSignUpSuccess?: () => void;
}
interface NewUserData {
  name: string;
  matric: string;
  department: string;
  password:string;
}

export function SignUp({ onBack, onSignInClick, onSignUpSuccess }: Props){
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName]= useState('')
    const [matric, setMatric]= useState('')
    const [department, setDepartment]= useState('')
    const [password, setPassword]= useState('')



    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      const newUser: NewUserData = {
        name: name,
        matric: matric,
        department: department,
        password: password
      }

      console.log(newUser);



      setTimeout(() => {
        setLoading(false);
        onSignUpSuccess?.();
      }, 1000);
    }

  return(
    <div className="min-h- flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-md w-full border border-gray-100 relative">

        {onBack && (
          <button 
            onClick={onBack} 
            className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div className="text-center mb-6 sm:mb-8 mt-6 sm:mt-2">
          <div className="bg-linear-to-r from-green-600 to-green-700 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">
            Create account
          </h2>
          <p className="text-sm sm:text- text-gray-600">
            Join 
            <span className="font-bold text-green-700">
              UniAbuja Vault
            </span>
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-4 sm:space-y-5">
            <input 
              required 
              placeholder="Full name" 
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="w-full px-3.5 py-2.5 sm:py-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-500 outline-none text-sm sm:text-base" />
            <input 
              required 
              placeholder="Matric number e.g 2001/12345" 
              value={matric}
              onChange={(e)=> setMatric(e.target.value)}
              className="w-full px-3.5 py-2.5 sm:py-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-500 outline-none text-sm sm:text-base" />
            <input 
              required 
              placeholder="Department e.g ABE" 
              value={department}
              onChange={(e)=> setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 sm:py-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-500 outline-none text-sm sm:text-base" />
          <div className="relative">
            <input 
              required 
              type={showPassword? "text" : "password"} 
              placeholder="Create password" 
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 sm:py-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-500 outline-none pr-12 text-sm sm:text-base" />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1 hover:text-gray-600">
              {showPassword? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-6 py-2.5 sm:py-3 rounded-lg font-semibold disabled:opacity-50 transition-colors text-sm sm:text-base">
            <UserPlus className="w-4 h-4" /> 
            {loading? 'Creating...' : 'Create Account'}
          </button>

          <div className="text-center text-xs sm:text-sm text-gray-600 pt-4 border-t">
            Already have an account?{" "}
            <button 
              type="button" 
              onClick={onSignInClick} 
              className="font-bold text-green-700 hover:underline">
                Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}