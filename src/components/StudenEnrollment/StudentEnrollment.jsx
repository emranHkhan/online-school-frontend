import { useEffect, useState } from "react"
import useAuth from "../../customHooks/useAuth"
import { useNavigate } from "react-router-dom"
import api from "../../utils/axiosInstance"
import Loader from "../loader/Loader"
import './studentEnrollment.css'
import { isoToReadableDate } from "../../utils/isoToReadableTime"

const StudentEnrollment = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { user_id: studentId, user_role: role } = user ?? {}
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!studentId || role !== 'student') navigate('/login')

        const getStudentEnrollment = async () => {
            setLoading(true)
            try {
                const res = await api.get(`enrollments/student/${studentId}/`)
                setEnrollments(res.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getStudentEnrollment()
    }, [studentId, navigate, role])


    if (loading) {
        return (<div className="container">
            <Loader />
        </div>)
    }

    return (
        <div className="container">
            <div className="table-container" >
                <div className="table">
                    <div className="table-header">
                        <div className="header__item"><span id="name" className="filter__link" href="#">Course Name</span></div>
                        <div className="header__item"><span id="draws" className="filter__link filter__link--number" href="#">Course Category</span></div>
                        <div className="header__item"><span id="wins" className="filter__link filter__link--number" href="#">Teacher Name</span></div>
                        <div className="header__item"><span id="losses" className="filter__link filter__link--number" href="#">Course Price</span></div>
                        <div className="header__item"><span id="losses" className="filter__link filter__link--number" href="#">Enrolled At</span></div>
                    </div>
                    {
                        enrollments.length > 0 ?
                            enrollments.map((enrollment, index) => {
                                return (
                                    <div className="table-content" key={enrollment.id}>
                                        <div className={`table-row ${index % 2 !== 0 && 'odd'}`}>
                                            <div className="table-data">{enrollment.course_info.name}</div>
                                            <div className="table-data">{enrollment.course_info.category}</div>
                                            <div className="table-data">{enrollment.course_info.teacher_name}</div>
                                            <div className="table-data">&#2547; {enrollment.course_info.price}</div>
                                            <div className="table-data">{isoToReadableDate(enrollment.enrolled_at)}</div>
                                        </div>
                                    </div>
                                )
                            }) : <div>
                                You haven&apos;t enrolled in any courses yet.
                            </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default StudentEnrollment