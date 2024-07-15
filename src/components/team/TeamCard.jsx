/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"

const TeamCard = ({ team }) => {
  return (
    <>
      <Link to={`/courses/?teacher=${team.id}`}>
        <div className='items shadow'>
          <div className='img'>
            <img src={team.image} alt='' />
            <div className='overlay'>
              <i className='fab fa-facebook-f icon'></i>
              <i className='fab fa-twitter icon'></i>
              <i className='fab fa-instagram icon'></i>
              <i className='fab fa-tiktok icon'></i>
            </div>
          </div>
          <div className='details'>
            <h2>{team.first_name} {team.last_name}</h2>
            <p>TOTAL COURSE: {team.course_count}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default TeamCard
