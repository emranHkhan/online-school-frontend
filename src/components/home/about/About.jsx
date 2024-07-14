import Heading from "../../common/heading/Heading.jsx"
import { Link, useNavigate } from "react-router-dom"
import { GoArrowRight } from "react-icons/go";
import useData from '../../../customHooks/useData.js'
import DynamicSVG from "../../svg/DynamicSVG.jsx";
import Departments from "../departments/Departments.jsx"
import "./about.css"

const About = () => {
  const { courses } = useData();
  const navigate = useNavigate()

  const handleClick = (course) => {
    navigate(`course/${course.id}`, { state: { course } });
  }

  return (
    <section className="container">
      <div>
        <Heading subtitle='our courses' title='explore popular courses' />

        <Link to={'/courses'} className="view-all-link">
          <span>view all</span>
          <GoArrowRight />
        </Link>


        <div className="course-card-container">
          {courses?.courses?.map((course) => (
            <div className="card" key={course.id}>
              <div className="card-header">
                <DynamicSVG words={course.title} />
                <div>
                  <h1 className="title">{course.title}</h1>
                  <h4 className="teacher"><small>by</small> {course.teacher_name}</h4>
                </div>
              </div>
              <div className="card-body">
                <p className="description">{course.description.slice(0, 200)}...</p>
                <strong><i className="fa-solid fa-money-check-dollar"></i> &#2547; {course.price}</strong>
              </div>
              <button className="outline-btn" onClick={() => handleClick(course)}>SEE DETAILS !</button>
            </div>
          ))}

        </div>

      </div>

      <Departments />
    </section >
  )
}

export default About
