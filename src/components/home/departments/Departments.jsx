import Heading from "../../common/heading/Heading"
import useData from "../../../customHooks/useData";
import { Link } from "react-router-dom";
import DynamicSVG from "../../svg/DynamicSVG";
import './department.css'

const Departments = () => {
  const { categories } = useData();
  return (
    <>
      <section className="departments">
        <Heading subtitle='COURSES' title='browse by department' />
        <div className='card-container'>
          {categories.map((cat) => (
            <Link to={`/courses/?category=${cat.id}`} key={cat.id}>
              <div className="card" >
                <DynamicSVG words={cat.name} />
                <h1 className="category-name">{cat.name} course</h1>
                <p className="course-count">Total Course: {cat.course_count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Departments
