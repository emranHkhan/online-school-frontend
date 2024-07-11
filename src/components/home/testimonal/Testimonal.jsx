import useData from "../../../customHooks/useData";
import Heading from "../../common/heading/Heading"
import "./style.css"
import image from '../../../../public/images/testo/t1.webp'

const Testimonal = () => {
  const { comments } = useData();

  return (
    <>
      <section className='testimonal padding'>
        <div className='container'>
          <Heading subtitle='TESTIMONIAL' title='Our Successful Students' />

          <div className='content grid2'>
            {comments.map((comment) => (
              <div className='items shadow' key={comment.id}>
                <div className='box flex'>
                  <div className='img'>
                    <img src={image} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{comment.student_name}</h2>
                    <span>Marketing Manager</span>
                  </div>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonal
