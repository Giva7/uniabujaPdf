import { useState } from "react"


export function UploadForm(){
    const [code, setCode] = useState('')
    const [title, setTitle] = useState('')
    const [department, setDepartment] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault();

        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        setLoading(true);
        const currentUser = JSON.parse(localStorage.getItem("vault_user") || "{}");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("code", code.toUpperCase());
        formData.append("title", title);
        formData.append("department", department);
       formData.append("uploadedBy", currentUser.name ? `${currentUser.name} (${currentUser.matricNumber})` : "Anonymous");

        try {
            const response = await fetch("https://uniabuja-vault-api.ichapijeff.workers.dev/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert("File successfully uploaded to Cloudflare R2!");
                setCode('');
                setTitle('');
                setDepartment('');
                setFile(null);
            } else {
                alert(`Upload failed: ${result.error || "Unknown server error"}`);
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Error connecting to server.");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-1">Upload to vault</h2>
            <p className="text-sm text-gray-600 mb-6">
                Uploading as <span className="font-bold text-green-700">Name</span> . matric number
            </p>
            <form onSubmit={handleUpload} className="space-y-4">
                <input 
                    value={code}
                    onChange={(e)=> setCode(e.target.value)}
                    required 
                    placeholder="course code" 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-500 outline-none" 
                />
                <input 
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    required 
                    placeholder="course title" 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-500 outline-none" 
                />
                <input 
                    value={department}
                    onChange={(e)=> setDepartment(e.target.value)}
                    required 
                    placeholder="department" 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-500 outline-none" 
                />
                
                <input 
                    required 
                    type="file" 
                    onChange={(e)=> setFile(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.xlsx,.xls"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                />
                {file && <p className="text-sm text-green-600">Selected: {file.name}</p>}

                <div className="flex gap-3">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => { setCode(''); setTitle(''); setDepartment(''); setFile(null); }}
                        className="border px-6 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}