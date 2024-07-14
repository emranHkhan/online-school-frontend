import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Head from "./Head"
import "./header.css"
import api from "../../../utils/axiosInstance"
import useAuth from "../../../customHooks/useAuth"
import { toast } from "react-toastify"
import { djangoErrors } from "../../../utils/djangrErrors"

const Header = () => {
  const [click, setClick] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()


  const handleLogOut = async () => {
    try {
      const res = await api.post('logout/')
      toast.success(res.data.detail)
      logout()
      navigate('/')
    } catch (error) {
      toast.error(djangoErrors(error))
      console.log(error)
    }
  }

  const addActiveStyle = (path) => location.pathname.includes(`/${path}`) ? 'active' : ''

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/courses' className={addActiveStyle('courses')}>All Courses</Link>
            </li>
            <li>
              <Link to='/team' className={addActiveStyle('team')}>Team</Link>
            </li>
            <li>
              <Link to='/about' className={addActiveStyle('about')}>About</Link>
            </li>
            <li>
              <Link to='/contact' className={addActiveStyle('contact')}>Contact</Link>
            </li>
            {
              !user && (
                <>
                  <li>
                    <Link to='/login' className={addActiveStyle('login')}>Login</Link>
                  </li>
                  <li>
                    <Link to='/register' className={addActiveStyle('register')}>Register</Link>
                  </li>
                </>
              )
            }
            {
              user?.user_role === 'student' && (
                <li>
                  <Link to={'my-courses'} className={addActiveStyle('my-courses')}>My Courses</Link>
                </li>
              )
            }
            {
              user?.user_role === 'teacher' && (
                <li>
                  <Link to={'dashboard'} className={addActiveStyle('dashboard')}>Dashboard</Link>
                </li>
              )
            }
            {
              user && (<li>
                <span onClick={handleLogOut}>Log Out</span>
              </li>)
            }
          </ul>
          <div className='start'>
            <div className='button'>GET CERTIFICATE</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
