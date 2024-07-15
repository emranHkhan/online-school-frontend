import { useState } from 'react';
import './createCourse.css';
import api from '../../utils/axiosInstance';
import useData from '../../customHooks/useData.js';
import useAuth from '../../customHooks/useAuth.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [price, setPrice] = useState('');
    const { departments } = useData();
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseData = { title, description, department, price, teacher: user.user_id };
        try {
            await api.post('courses/create/', courseData);
            setTitle('');
            setDescription('');
            setDepartment('');
            setPrice('');
            toast.success('Course created successfully.')
            navigate('/dashboard/my-courses');
        } catch (error) {
            console.error('Error creating course:', error);
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
                        name='title'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        rows={10}
                        onChange={(e) => setDescription(e.target.value)}
                        name='description'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department:</label>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        name='department'
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
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCourse;
