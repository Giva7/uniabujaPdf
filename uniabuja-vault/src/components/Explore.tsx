import { useState, useMemo } from "react"
import type { CourseTypes } from "./data"
import { Featured } from "./Featured";
import { SearchFunction } from "./SearchFunction";
import { PdfGrid } from "./PdfGrid";

type Props ={
    courses: CourseTypes[];
    setCourses: (courses: CourseTypes[]) => void;
}

export function Explore({courses, setCourses}:Props){
    const [search, setSearch] = useState('');

    const filteredCourses = useMemo(() => {
        if (!search.trim()) return courses;
        const q = search.toLowerCase();
        return courses.filter(c => 
            c.code.toLowerCase().includes(q) || 
            c.title.toLowerCase().includes(q) ||
            c.department.toLowerCase().includes(q)
        );
    }, [courses, search]);

    return(
        <div>
            <Featured courses={courses} />
            <SearchFunction value={search} onChange={setSearch} />
            <PdfGrid courses={filteredCourses} setCourses={setCourses} allCourses={courses} />
            
            {filteredCourses.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No PDFs found for "{search}"
                </div>
            )}
        </div>
    )
}