import { useState, useEffect } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MyCourses from '../my-courses/MyCourses';
import CreateCourse from '../create-course/CreateCourse';
import CourseEdit from '../course-edit/CourseEdit';
import api from '../../utils/axiosInstance';
import './dashboard.css';

const Dashboard = () => {
    const [selectedLink, setSelectedLink] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const res = await api.get('courses/');
                setCourses(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllCourses();

        if (location.pathname === '/dashboard') {
            setSelectedLink('my-courses');
            navigate('/dashboard/my-courses');
        } else if (location.pathname.includes('my-courses')) {
            setSelectedLink('my-courses');
        } else if (location.pathname.includes('course/create')) {
            setSelectedLink('course/create');
        } else {
            setSelectedLink('');
        }
    }, [location, navigate]);

    return (
        <div className="container">
            <div className="dashboard">
                <nav className="sidebar">
                    <ul>
                        <li>
                            <Link
                                to="/dashboard/my-courses"
                                className={selectedLink === 'my-courses' ? 'selected' : ''}
                                onClick={() => setSelectedLink('my-courses')}
                            >
                                <i className="fa-solid fa-list" style={{ marginRight: '5px' }}></i> My Courses
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/course/create"
                                className={selectedLink === 'course/create' ? 'selected' : ''}
                                onClick={() => setSelectedLink('course/create')}
                            >
                                <i className="fa-solid fa-list" style={{ marginRight: '5px' }}></i> Create Course
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="content">
                    <Routes>
                        <Route path="my-courses" element={<MyCourses courses={courses} />} />
                        <Route path="course/create" element={<CreateCourse />} />
                        <Route path="course/:id/edit" element={<CourseEdit />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

