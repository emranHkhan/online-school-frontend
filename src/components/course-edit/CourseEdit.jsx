import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../utils/axiosInstance";
import useAuth from "../../customHooks/useAuth";
import useData from "../../customHooks/useData";
import { useLocation, useNavigate } from "react-router-dom";

const CourseEdit = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [price, setPrice] = useState('');
    const { departments } = useData();
    const { user } = useAuth();
    const location = useLocation();
    const { course } = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        if (course) {
            setTitle(course.title);
            setDescription(course.description);
            setDepartment(course.department);
            setPrice(course.price);
        }
    }, [course]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseData = { title, description, department, price, teacher: user.user_id };

        try {
            if (course) {
                const res = await api.put(`courses/${course.id}/`, courseData);
                console.log('Course updated successfully:', res.data);
                toast.success('Course updated successfully.');
            } else {
                const res = await api.post('courses/create/', courseData);
                console.log('Course created successfully:', res.data);
                toast.success('Course created successfully.');
            }
            navigate('/dashboard/my-courses')
        } catch (error) {
            console.error('Error creating/updating course:', error);
            toast.error('Error creating/updating course.');
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="course-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        rows={10}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department:</label>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a department</option>
                        {departments.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    {course ? 'Update Course' : 'Create Course'}
                </button>
            </form>
        </div>
    );
};

export default CourseEdit;
