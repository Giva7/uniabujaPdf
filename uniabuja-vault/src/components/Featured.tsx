import { TrendingUp, Star } from "lucide-react";
import type { CourseTypes } from "./data";

const API_BASE_URL = "https://uniabuja-vault-api.ichapijeff.workers.dev";

type Props ={
    courses: CourseTypes[];
    setCourses: (courses: CourseTypes[]) => void;
}

export function Featured({courses, setCourses}:Props){
    const topCourses = [...courses]
        .sort((a, b) => b.downloadCount - a.downloadCount)
        .slice(0, 2);

    const handleDownload = (course: CourseTypes) => {
        if (!course.file_name) {
            alert('No file available for this course');
            return;
        }

        const updated = courses.map(c => 
            c.id === course.id ? { ...c, downloadCount: c.downloadCount + 1 } : c
        );
        setCourses(updated);

        const link = document.createElement('a');
        link.href = `${API_BASE_URL}/api/download/${course.id}`;
        link.download = course.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return(
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-700" />Most Popular
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topCourses.map(course => (
                <div key={course.id} className="bg-linear-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">✓ Verified</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
                  <div className="text-sm text-gray-600 mb-2">{course.code}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{course.downloadCount} downloads</span>
                   
                    <button 
                        onClick={() => handleDownload(course)}
                        className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Download</button>
                  </div>
                </div>
              ))}
            </div>
        </div>
    )
}