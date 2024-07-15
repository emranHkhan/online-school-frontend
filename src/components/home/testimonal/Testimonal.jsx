import useData from "../../../customHooks/useData";
import Heading from "../../common/heading/Heading"
import "./testimonial.css"

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
                    <img src={comment.student_image} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="student-name">{comment.student_first_name} {comment.student_last_name}</h3>
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
