import { useState, useEffect } from "react";
import { FileText, Download, User, GraduationCap, Trash2, LogOut } from "lucide-react";
import type { CourseTypes } from "./data";


type Props = {
  onSignOut?: () => void;
  onUploadClick?: () => void;
};

const API_BASE_URL = "https://uniabuja-vault-api.ichapijeff.workers.dev";

export function ProfilePage({ onSignOut, onUploadClick }: Props) {
  const currentUser = JSON.parse(localStorage.getItem("vault_user") || "{}");
  const [uploads, setUploads] = useState<CourseTypes[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserUploads = () => {
    if (!currentUser.name) return;
    const uploadedBy = `${currentUser.name} (${currentUser.matricNumber})`;
    fetch(`${API_BASE_URL}/api/courses/user?user=${encodeURIComponent(uploadedBy)}`)
      .then((res) => res.json())
      .then((data) => setUploads(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUserUploads();
  }, );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUploads((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      alert(`Failed to delete file.${err}`);
    }
  };

  const initials = currentUser.name
    ? currentUser.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "U";

  const totalDownloads = uploads.reduce((acc, curr) => acc + (curr.downloadCount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Left - User Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 text-center md:sticky md:top-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl sm:text-3xl font-bold text-white">{initials}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-1">{currentUser.name || "Student"}</h2>
            <p className="text-sm text-gray-500 mb-2">{currentUser.matricNumber || "N/A"}</p>
            <p className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block font-semibold">Verified Student</p>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xl sm:text-2xl font-bold">{uploads.length}</p>
                <p className="text-xs text-gray-500">Uploads</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xl sm:text-2xl font-bold">{totalDownloads}</p>
                <p className="text-xs text-gray-500">Downloads</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-left text-sm">
              <div className="flex items-center gap-2.5 text-gray-600">
                <User className="w-4 h-4 shrink-0" />
                <span className="truncate">{currentUser.name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-600">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span className="truncate text-xs sm:text-sm">UniAbuja Student</span>
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
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{uploads.length} files</span>
            </div>

            <div className="p-4 sm:p-5 grid gap-4">
              {loading ? (
                <p className="text-center text-gray-500 text-sm py-4">Loading uploads...</p>
              ) : uploads.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm mb-3">You haven't uploaded any documents yet.</p>
                  <button onClick={onUploadClick} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Upload Now</button>
                </div>
              ) : (
                uploads.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                    <div className="flex gap-3">
                      <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-green-700 text-xs sm:text-sm">{item.code}</p>
                            <p className="font-semibold text-sm truncate">{item.title}</p>
                            <p className="text-xs text-gray-500 mt-1 truncate">{item.department} • {item.file_name}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" /> {item.downloadCount || 0} downloads</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => handleDelete(item.id)} className="w-full bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-colors">
                        <Trash2 className="w-4 h-4" /> Delete File
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}