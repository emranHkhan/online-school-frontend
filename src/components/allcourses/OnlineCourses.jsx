import "./courses.css"
import { online } from "../../dummydata"
import Heading from "../common/heading/Heading"
import useData from "../../customHooks/useData";
import image from "../../../public/images/courses/online/o1.png"
import imageH from "../../../public/images/courses/online/o1.1.png"

const OnlineCourses = () => {
  const { categories } = useData();
  return (
    <>
      <section className='online'>
        <div className='container'>
          <Heading subtitle='COURSES' title='Browse Our Online Courses' />
          <div className='content grid3'>
            {categories.map((cat) => (
              <div className='box' key={cat.id}>
                <div className='img'>
                  <img src={image} />
                  <img src={imageH} alt='' className='show' />
                </div>
                <h1>{cat.name} courses</h1>
                <span>Total Course: {cat.course_count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses
