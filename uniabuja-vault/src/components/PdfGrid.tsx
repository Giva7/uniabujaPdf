import { CheckCircle, Download, FileText, Eye } from "lucide-react";
import type { CourseTypes } from "./data";

const API_BASE_URL = "https://uniabuja-vault-api.ichapijeff.workers.dev";

type Props = {
  courses: CourseTypes[];
  allCourses: CourseTypes[]; // full list to update correctly when filtered
  setCourses: (courses: CourseTypes[]) => void;
}

export function PdfGrid({ courses, allCourses, setCourses }: Props){
    const handleDownload = (course: CourseTypes) =>{
        if(!course.file_name){
            alert('No file available for this course');
            return;
        }
        
        // 1. Optimistic count bump for instant feedback — /api/download
        // now also updates the real count in D1
        const updated = allCourses.map(c => 
            c.id === course.id ? { ...c, downloadCount: c.downloadCount + 1 } : c
        );
        setCourses(updated);

        // 2. The file lives in R2, so this has to go through the Worker
        const link = document.createElement('a');
        link.href = `${API_BASE_URL}/api/download/${course.id}`;
        link.download = course.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return(
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-linear-to-r from-green-600 to-green-700 text-white p-4">
                        <div className="flex justify-between mb-2">
                            <FileText className="w-8 h-8" />
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg">{course.code}</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2 text-sm mb-4">
                       <div className="flex justify-between">
                            <span className="font-semibold">Title:</span>
                            <span className="text-green-700 font-semibold">{course.title}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">
                                Department:
                            </span>
                            <span className="text-xs">
                                {course.department}
                            </span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                            <span>
                            By: {course.uploadedBy}
                            </span>
                            <span className="bg-gray-500 text-white px-2 py-0.5 rounded text-xs">
                                New
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Eye className="w-4 h-4" />
                            {course.downloadCount}
                        </span>
                        <button 
                            onClick={() => handleDownload(course)}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold">
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
    )
}