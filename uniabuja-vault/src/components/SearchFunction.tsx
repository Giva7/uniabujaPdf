import { Search } from "lucide-react"

type Props = {
  value: string;
  onChange: (value: string) => void;
}

export function SearchFunction({ value, onChange }: Props){
    return(
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                    type="text" 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search PDFs by code or title..." 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" 
                />
            </div>
            {value && (
              <p className="text-xs text-gray-500 mt-3">
                Showing results for <span className="font-bold text-green-700">"{value}"</span>
              </p>
            )}
        </div>
    )
}