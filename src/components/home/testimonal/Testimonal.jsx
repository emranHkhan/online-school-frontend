import useData from "../../../customHooks/useData";
import Heading from "../../common/heading/Heading"
import "./testimonial.css"
import image from '../../../../public/images/testo/t1.webp'

const Testimonal = () => {
  const { comments } = useData();

  return (
    <>
      <section className='container'>
        <div className='testimonial'>
          <Heading subtitle='TESTIMONIAL' title='Our Successful Students' />

          <div className="card-container">
            {comments.map((comment) => (
              <div className='card' key={comment.id}>
                <div className="card-header">
                  <div className="image-container">
                    <img src={image} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <h2 className="student-name">{comment.student_name}</h2>
                </div>
                <div className="card-body">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonal
