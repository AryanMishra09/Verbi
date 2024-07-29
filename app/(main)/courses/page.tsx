import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";

const CoursesPage = async () => {

    // simply calling the api is not done to avoid waterfall issue, so i have wrapped it all inside a Promise
    // const courses = await getCourses();
    // const userProgress = await  getUserProgress() 

    const coursesData =  getCourses();
    const userProgressData = getUserProgress() 

    const [
        courses,
        userProgress,
    ] = await Promise.all([
        coursesData, 
        userProgressData
    ]);

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-white">
                Language Courses
            </h1>
            <List 
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    )
}

export default CoursesPage;