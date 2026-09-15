import { FileText, Download, Eye, Calendar, User, GraduationCap, BookOpen, Trash2, LogOut } from "lucide-react";

type Props = {
  onSignOut?: () => void;
  onUploadClick?: () => void;
}

export function ProfilePage({ onSignOut, onUploadClick }: Props){
  return(
    <div className="min-h- bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

        {/* Left - User Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 text-center md:sticky md:top-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl sm:text-3xl font-bold text-white">JD</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-1">Jeffery Daniels</h2>
            <p className="text-sm text-gray-500 mb-2">2001/12345</p>
            <p className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block font-semibold">ABE • 300 Level</p>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xl sm:text-2xl font-bold">2</p>
                <p className="text- sm:text-xs text-gray-500">Uploads</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xl sm:text-2xl font-bold">20</p>
                <p className="text- sm:text-xs text-gray-500">Downloads</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-left text-sm">
              <div className="flex items-center gap-2.5 text-gray-600">
                <User className="w-4 h-4 shrink-0" />
                <span className="truncate">Jeffery Daniels</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-600">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span className="truncate text-xs sm:text-sm">Agricultural & Bio-Environmental</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-600">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>300 Level</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-600">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Joined Sept 2025</span>
              </div>
            </div>

            <button onClick={onSignOut} className="w-full mt-6 flex items-center justify-center gap-2 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg font-semibold hover:bg-red-50 text-sm transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Right - Uploads */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-base sm:text-lg">My Uploads</h3>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">2 files</span>
            </div>

            <div className="p-4 sm:p-5 grid gap-4">
              {/* Upload Item */}
              {[
                { code: 'GST312', title: 'peace and conflict', status: 'Approved', views: 12, downloads: 8, time: '2 days ago', color: 'red' },
                { code: 'ENT312', title: 'entrepreneurship', status: 'Pending', views: 4, downloads: 2, time: '5 hours ago', color: 'blue' },
              ].map((item) => (
                <div key={item.code} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex gap-3">
                    <div className={`bg-${item.color}-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${item.color === 'red'? 'bg-red-50' : 'bg-blue-50'}`}>
                      <FileText className={`w-6 h-6 ${item.color === 'red'? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-green-700 text-xs sm:text-sm">{item.code}</p>
                          <p className="font-semibold text-sm sm:text- truncate">{item.title}</p>
                          <p className="text- sm:text-xs text-gray-500 mt-1 truncate">general • ABE324_Practical_Lab_Report.docx</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text- sm:text-xs font-semibold shrink-0 ${item.status === 'Approved'? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text- sm:text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {item.views} views</span>
                        <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {item.downloads} downloads</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {item.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors">View</button>
                    <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-colors">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}