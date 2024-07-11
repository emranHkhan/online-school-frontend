import useData from "../../customHooks/useData"
import api from "../../utils/axiosInstance"
import CoursesCard from "./CoursesCard"

const CourseHome = () => {
  const { courses } = useData()
  const { teachers, categories, setCourses } = useData()

  const getCourseByFilter = async (query, id = null) => {
    try {
      if (query === 'teacher') {
        const res = await api.get(`courses/?teacher=${id}`)
        setCourses(res.data)
      } else if (query === 'category') {
        const res = await api.get(`courses/?category=${id}`)
        setCourses(res.data)
      } else {
        const res = await api.get('courses/')
        setCourses(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="container">
        <section className='coursesCard'>
          <div className="course-filter">
            <div>
              <h3 onClick={() => getCourseByFilter('all')}>All</h3>
            </div>
            <div>
              <h3>Teacher</h3>
              {
                teachers.map(teacher => <p onClick={() => getCourseByFilter('teacher', teacher.id)} key={teacher.id}>{teacher.first_name} {teacher.last_name}</p>)
              }
            </div>
            <div>
              <h3>Department</h3>
              {
                categories.map(category => <p onClick={() => getCourseByFilter('category', category.id)} key={category.id}>{category.name}</p>)
              }
            </div>
          </div>
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
