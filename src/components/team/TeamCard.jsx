/* eslint-disable react/prop-types */

import image from '../../../public/images/team/t1.webp'

const TeamCard = ({ team }) => {
  return (
    <>
      <div className='items shadow'>
        <div className='img'>
          <img src={image} alt='' />
          <div className='overlay'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-tiktok icon'></i>
          </div>
        </div>
        <div className='details'>
          <h2>{team.first_name} {team.last_name}</h2>
          <p>DEVELOPER AND LEAD INSTRUCTOR</p>
          <p>TOTAL COURSE: {team.course_count}</p>
        </div>
      </div>
    </>
  )
}

export default TeamCard
