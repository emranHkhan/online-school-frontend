import { createContext, useState, useEffect } from 'react';
import api from '../utils/axiosInstance';

const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [comments, setcomments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [coursesResponse, departmentsResponse, commentsResponse, teachersResponse] = await Promise.all([
                    api.get('courses/'),
                    api.get('departments/'),
                    api.get('comments/'),
                    api.get('teachers/')
                ]);

                setCourses(coursesResponse.data);
                setDepartments(departmentsResponse.data);
                setcomments(commentsResponse.data);
                setTeachers(teachersResponse.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const value = { courses, departments, comments, teachers, loading, error, setCourses };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;