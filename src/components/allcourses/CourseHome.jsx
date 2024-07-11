import useData from "../../customHooks/useData"
import CoursesCard from "./CoursesCard"

const CourseHome = () => {
  const { courses } = useData()

  return (
    <>
      <div className="container">
        <section className='coursesCard'>
          <div className='container grid2'>
            {
              courses?.courses?.map(course => <CoursesCard key={course.id} course={course} />)
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default CourseHome
