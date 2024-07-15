import Heading from "../../common/heading/Heading"
import useData from "../../../customHooks/useData";
import { Link } from "react-router-dom";
import DynamicSVG from "../../svg/DynamicSVG";
import './department.css'

const Departments = () => {
  const { departments } = useData();
  return (
    <>
      <section className="departments">
        <Heading subtitle='COURSES' title='browse by department' />
        <div className='card-container'>
          {departments.map((dept) => (
            <Link to={`/courses/?department=${dept.id}`} key={dept.id}>
              <div className="card" >
                <DynamicSVG words={dept.name} />
                <h1 className="deptegory-name">{dept.name} course</h1>
                <p className="course-count">Total Course: {dept.course_count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Departments
