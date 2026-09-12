import type { CourseTypes } from "./data"
import { Featured } from "./Featured";
import { SearchFunction } from "./SearchFunction";
import { PdfGrid } from "./PdfGrid";


type Props ={
    courses: CourseTypes[];
    setCourses: (courses: CourseTypes[]) => void;
}

export function Explore({courses, setCourses}:Props){
    return(
        <div>
            <Featured courses={courses} />

            <SearchFunction />
            <PdfGrid courses={courses} />
        </div>
    )
}