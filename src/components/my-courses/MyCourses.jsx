/* eslint-disable react/prop-types */
import useAuth from '../../customHooks/useAuth.js'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/axiosInstance.js'
import './mycourses.css'
import { toast } from 'react-toastify'

const MyCourses = ({ courses }) => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleEdit = (course) => {
        navigate(`/dashboard/course/${course.id}/edit`, { state: { course } });
    }

    const handleDelete = async (courseId) => {
        try {
            await api.delete(`courses/${courseId}/`)
            toast.success('Course deleted successfully.')
            navigate('/dashboard/my-courses')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {courses?.courses?.map((course) => (
                <div className={` ${course.teacher_name !== user.user_name ? 'hidden' : null}`} key={course.id}>
                    <div className='teacher-course-card'>
                        <div className='card-header'>
                            <h1>{course.title}</h1>
                            <small>{course.category_name}</small>
                        </div>
                        <div className='card-body'>
                            <p>{course.description}</p>
                            <strong> &#2547; {course.price}</strong>
                        </div>
                        <div className='card-footer'>
                            <div className='edit' onClick={() => handleEdit(course)}>
                                <i className="fa-regular fa-pen-to-square"></i>
                            </div>
                            <div className='delete' onClick={() => handleDelete(course.id)}>
                                <i className="fa-regular fa-trash-can"></i>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MyCourses