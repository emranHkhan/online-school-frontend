import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='welcom to  brightlearn' title='Learn Anytime, Anywhere' />
            <p>Flexible, high-quality education tailored to your needs, empowering you to learn and succeed anytime, anywhere</p>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
