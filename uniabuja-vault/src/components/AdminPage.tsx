import { useState, useEffect } from "react";
import { FileText, Trash2, CheckCircle, Clock, Users, Download, Shield, Search } from "lucide-react";
import type { CourseTypes } from "./data";


const API_BASE_URL = "https://uniabuja-vault-api.ichapijeff.workers.dev";

export function AdminPage() {
  const [courses, setCourses] = useState<CourseTypes[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchAdminCourses = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/admin/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const loadData = async () => {
    await fetchAdminCourses()};
    loadData();

  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/courses/${id}/approve`, { method: "PUT" });
      if (res.ok) {
        setCourses((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item))
        );
      }
    } catch (err) {
      alert(`Failed to approve file. ${err}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this file?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      alert(`Failed to delete file. ${err}`);
    }
  };

  const filteredCourses = courses.filter((c) => {
    const codeStr = (c.code || "").toLowerCase();
    const titleStr = (c.title || "").toLowerCase();
    const searchStr = search.toLowerCase();

    const matchesSearch = codeStr.includes(searchStr) || titleStr.includes(searchStr);

    if (filter === "Pending") return matchesSearch && c.status === "pending";
    if (filter === "Approved") return matchesSearch && c.status === "approved";
    return matchesSearch;
  });

  const pendingCount = courses.filter((c) => c.status === "pending").length;
  const approvedCount = courses.filter((c) => c.status === "approved").length;
  const totalDownloads = courses.reduce((acc, curr) => acc + (curr.downloadCount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-green-600 to-green-700 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Manage <span className="font-bold text-green-700">UniAbuja Vault</span>
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { icon: FileText, color: "text-green-600", bg: "bg-green-100 text-green-700", label: "Total", value: courses.length, sub: "Total Files" },
          { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100 text-yellow-700", label: "Pending", value: pendingCount, sub: "Needs Review" },
          { icon: Users, color: "text-blue-600", bg: "bg-blue-100 text-blue-700", label: "Approved", value: approvedCount, sub: "Live on Explore" },
          { icon: Download, color: "text-purple-600", bg: "bg-gray-100 text-gray-700", label: "Downloads", value: totalDownloads, sub: "All time" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`${stat.bg} px-2 py-0.5 rounded-full text-xs font-semibold`}>{stat.label}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Search & Table Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 justify-between sm:items-center">
          <h3 className="font-bold text-base sm:text-lg">Resource Submissions</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search code or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending Only</option>
              <option value="Approved">Approved Only</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-8 text-gray-500 text-sm">Loading admin data...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center py-8 text-gray-500 text-sm">No files match your search or filter criteria.</p>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                  <tr>
                    <th className="text-left p-4 font-semibold">Code</th>
                    <th className="text-left p-4 font-semibold">Title</th>
                    <th className="text-left p-4 font-semibold">Dept</th>
                    <th className="text-left p-4 font-semibold">Uploaded By</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCourses.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold text-green-700">{row.code}</td>
                      <td className="p-4 max-w-xs truncate">{row.title}</td>
                      <td className="p-4">
                        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{row.department}</span>
                      </td>
                      <td className="p-4 text-xs text-gray-500">{row.uploadedBy}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            row.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {row.status || "pending"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {row.status !== "approved" && (
                            <button
                              onClick={() => handleApprove(row.id)}
                              title="Approve File"
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                            >
                              <CheckCircle className="w-4 h-4" /> Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(row.id)}
                            title="Delete File"
                            className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden p-4 grid gap-3">
              {filteredCourses.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-3.5 flex justify-between items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-green-700 text-sm truncate">{item.code}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          item.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status || "pending"}
                      </span>
                    </div>
                    <p className="text-sm font-semibold truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.uploadedBy}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {item.status !== "approved" && (
                      <button onClick={() => handleApprove(item.id)} className="bg-green-600 text-white p-2.5 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(item.id)} className="bg-red-50 text-red-600 p-2.5 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}