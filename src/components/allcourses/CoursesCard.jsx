/* eslint-disable react/prop-types */
import "./courses.css"
import image from "../../../public/images/courses/c1.png"
import { useNavigate } from "react-router-dom"

const CoursesCard = ({ course }) => {
  const navigate = useNavigate()

  const handleDetails = (course) => {
    navigate(`/course/${course.id}`, { state: { course } });
  }

  return (
    <>
      <div className='items'>
        <div className='content flex'>
          <div className='left'>
            <div className='img'>
              <img src={image} alt='' />
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
                  <h4>{course.teacher_name}</h4>
                </div>
              </div>
              {/* <span>{course.totalTime}</span> */}

            </div>
          </div>
        </div>
        <div className='price'>
          <h3>
            {course.price} &#2547;
          </h3>
        </div>
        <button className='outline-btn' onClick={() => handleDetails(course)}>SEE DETAILS !</button>
      </div>
    </>
  )
}

export default CoursesCard
