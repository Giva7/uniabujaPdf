export interface CourseTypes{
    id: string;
    code: string;
    title: string;
    department:string;
    downloadCount: number;
    uploadedBy: string;
    file_key?: string;
    file_name?: string;
}

export interface UserTypes{
    matric: string;
    password: string;
    department: string;
    level: string;
    name: string;
}

export const data: CourseTypes[] = [
    {
        id: crypto.randomUUID(),
        code :'ABE324',
        title: 'pratical',
        department: 'general',
        downloadCount: 0,
        uploadedBy: 'Admin',
        file_name: 'ABE324_Practical_Lab_Report.docx'
    },
    {
        id: crypto.randomUUID(),
        code :'ENT312',
        title: 'entrepreneurship',
        department: 'general',
        downloadCount: 0,
        uploadedBy: 'Admin',
        file_name: 'ABE324_Practical_Lab_Report.docx'
    }
]

export const userData: UserTypes[] =[
    {  
        matric: '23/205TVD/004',
        password: "password123",
        department: "computer science",
        level: "400", 
        name:"jeffrey"
    }
]