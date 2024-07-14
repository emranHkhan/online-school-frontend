import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import './course-details.css'
import useAuth from "../../customHooks/useAuth";
import { djangoErrors } from "../../utils/djangrErrors";
import { useEffect, useState } from "react";
import { isoToReadableDate } from "../../utils/isoToReadableTime.js"

const Course = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { course } = location.state || {};
    const { user } = useAuth()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [isCommentSubmitted, setIsCommentSubmitted] = useState(false)

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await api.get('comments/')
                setComments(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        getComments()
    }, [isCommentSubmitted])



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
            console.error(error)
        }
    }


    const handleCommentSubmit = async () => {
        try {
            await api.post('comments/', { course: course.id, student: user.user_id, content: comment })
            setIsCommentSubmitted(prev => !prev)
        } catch (error) {
            toast.error(djangoErrors(error))
            console.error(error)
        } finally {
            setComment('')
        }
    }

    if (!course) {
        return <div className="container">
            <p>No course data available.</p>
        </div>;
    }

    console.log(course)

    return (
        <section className="container">
            <div className="course-details">
                <div className="teacher-img">
                    <img src={course.teacher_image} alt="" />
                </div>
                <div className="course-info">
                    <div className="course-info-inner">
                        <div>
                            <h1>{course.title}</h1>
                            <small>{course.category_name}</small>
                        </div>
                        <div>
                            <span>Instructor: </span><strong>{course.teacher_name}</strong>
                        </div>
                    </div>
                    <hr />
                    <p className="course-description">{course.description}</p>
                    <div>
                        <span className="course-price">&#2547; {course.price}</span>
                        <button className='outline-btn' onClick={() => handleEnrollment(course)}>ENROLL NOW !</button>
                    </div>
                </div>
            </div>
            {
                user && (
                    <div className="comment">
                        <h2>Comment</h2>
                        <textarea name="comment" id="comment" rows={5} placeholder="Write Here..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <button className="comment-btn" onClick={handleCommentSubmit}>Submit</button>
                    </div>
                )
            }
            <div className="comment">
                {
                    comments.map(comment => {
                        return (
                            comment.course === course.id && (
                                <div key={comment.id} className="previous-comments">
                                    <div className="img-container">
                                        <img src={comment.student_image} alt="" />
                                    </div>
                                    <div>
                                        <div className="comment-info">
                                            <strong>{comment.student_name}</strong>
                                            <small>{isoToReadableDate(comment.created_at)}</small>
                                        </div>
                                        <p id="comment-content">{comment.content}</p>
                                    </div>
                                </div>
                            )
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Course