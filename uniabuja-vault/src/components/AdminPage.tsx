import { FileText, Trash2, CheckCircle, Clock, Users, Download, Eye, Shield, Search } from "lucide-react";

export function AdminPage(){
  return(
    <div className="min-h- bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-r from-green-600 to-green-700 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-600">Manage <span className="font-bold text-green-700">UniAbuja Vault</span></p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { icon: FileText, color: 'text-green-600', bg: 'bg-green-100 text-green-700', label: 'Total', value: '2', sub: 'Total PDFs' },
          { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100 text-yellow-700', label: 'New', value: '3', sub: 'Pending Review' },
          { icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 text-blue-700', label: 'Live', value: '128', sub: 'Students' },
          { icon: Download, color: 'text-purple-600', bg: 'bg-gray-100 text-gray-700', label: 'All time', value: '1,420', sub: 'Downloads' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`${stat.bg} px-2 py-0.5 rounded-full text- sm:text-xs font-semibold`}>{stat.label}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
            <p className="text- sm:text-xs text-gray-500">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 justify-between sm:items-center">
          <h3 className="font-bold text-base sm:text-lg">All Uploads</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search code or title..."
                className="w-full sm:w-64 pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
              />
            </div>
            <select className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm bg-white">
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold">Code</th>
                <th className="text-left p-3 sm:p-4 font-semibold">Title</th>
                <th className="text-left p-3 sm:p-4 font-semibold">Dept</th>
                <th className="text-left p-3 sm:p-4 font-semibold">By</th>
                <th className="text-left p-3 sm:p-4 font-semibold">Views</th>
                <th className="text-left p-3 sm:p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { code: 'GST312', title: 'peace and conflict', views: 12 },
                { code: 'ENT312', title: 'entrepreneurship', views: 8 },
              ].map((row) => (
                <tr key={row.code} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-green-700">{row.code}</td>
                  <td className="p-3 sm:p-4 truncate max-w-">{row.title}</td>
                  <td className="p-3 sm:p-4"><span className="bg-gray-100 px-2 py-1 rounded-full text-xs">general</span></td>
                  <td className="p-3 sm:p-4 text-xs text-gray-500">Admin</td>
                  <td className="p-3 sm:p-4"><span className="flex items-center gap-1"><Eye className="w-4 h-4 text-gray-400" /> {row.views}</span></td>
                  <td className="p-3 sm:p-4">
                    <div className="flex gap-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 grid gap-3">
          {[
            { code: 'GST312', title: 'peace and conflict', views: 12 },
            { code: 'ENT312', title: 'entrepreneurship', views: 8 },
          ].map((item) => (
            <div key={item.code} className="border border-gray-200 rounded-xl p-3.5 flex justify-between items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-green-700 text-sm truncate">{item.code} - {item.title}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> By Admin • {item.views} views</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="bg-green-600 text-white p-2.5 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button className="bg-red-50 text-red-600 p-2.5 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}