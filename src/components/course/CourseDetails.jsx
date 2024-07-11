import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import './course-details.css'
import image from "../../../public/images/team/t1.webp"
import useAuth from "../../customHooks/useAuth";
import { djangoErrors } from "../../utils/djangrErrors";

const Course = () => {
    const location = useLocation();
    const { course } = location.state || {};
    const { user } = useAuth()
    const navigate = useNavigate()


    if (!course) {
        return <div>No course data available.</div>;
    }

    const handleEnrollment = async () => {
        if (!user) {
            navigate('/login')
            toast.error("Please Login to enroll");
            return
        }

        try {
            await api.post('enrollments/', { student: user.user_id, course: course.id })
            toast.success('Congratulations! Enrollment done.')
        } catch (error) {
            toast.error(djangoErrors(error));
        }
    }


    return (
        <section className="container">
            <div className="course-details">
                <div className="teacher-info">
                    <img src={image} alt="" />
                    <p>{course.teacher_name}</p>
                    <p>LEAD INSTRUCTOR</p>
                </div>
                <div className="course-info">
                    <div>
                        <h1>{course.title}</h1>
                        <small>{course.category_name}</small>
                        <p className="course-description">{course.description}</p>
                    </div>
                    <div>
                        <span className="course-price">&#2547; {course.price}</span>
                        <button className='outline-btn' onClick={() => handleEnrollment(course)}>ENROLL NOW !</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Course