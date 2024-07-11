import OnlineCourses from "../allcourses/OnlineCourses"
import Heading from "../common/heading/Heading"
import "../allcourses/courses.css"
import { Link, useNavigate } from "react-router-dom"
import { GoArrowRight } from "react-icons/go";
import useData from '../../customHooks/useData.js'

const HAbout = () => {
  const { courses } = useData();
  const navigate = useNavigate()

  const handleClick = (course) => {
    navigate(`course/${course.id}`, { state: { course } });
  }

  return (
    <>
      <section className='homeAbout'>
        <div className='container'>
          <Heading subtitle='our courses' title='explore popular courses' />

          <Link to={'/courses'} className="view-all-link">
            <span>view all</span>
            <GoArrowRight />
          </Link>

          <div className='coursesCard'>
            {/* copy code form  coursesCard */}
            <div className='grid2'>
              {courses?.courses?.map((course) => (
                <div className='items' key={course.id}>
                  <div className='content flex'>
                    <div className='left'>
                      <div className='img'>
                        {/* <img src={course.cover} alt='' /> */}
                      </div>
                    </div>
                    <div className='text'>
                      <h1>{course.title}</h1>
                      {/* <div className='rate'>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <label htmlFor=''>(5.0)</label>
                      </div> */}
                      <div className='details'>

                        <div className='box'>
                          <div className='dimg'>
                            {/* <img src={course.dcover} alt='' /> */}
                          </div>
                          <div className='para'>
                            <h4>by {course.teacher_name}</h4>
                          </div>
                        </div>
                        {/* <span>{course.totalTime}</span> */}

                      </div>
                    </div>
                  </div>
                  <div className='price'>
                    <h3>
                      {course.price}
                    </h3>
                  </div>
                  <button className='outline-btn' onClick={() => handleClick(course)}>SEE DETAILS !</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <OnlineCourses />
      </section >
    </>
  )
}

export default HAbout
