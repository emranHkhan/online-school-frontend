import { useState } from 'react';
import api from '../../utils/axiosInstance';
import "./auth.css"
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        specialization: '',
        role: '',
        image: null,
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role') {
            setIsStudent(value === 'student');
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const uploadData = new FormData();
        Object.keys(formData).forEach((key) => {
            uploadData.append(key, formData[key]);
        });

        try {
            const imageFormData = new FormData();
            imageFormData.append('image', formData.image);

            const imageResponse = await axios.post('https://api.imgbb.com/1/upload?key=862377d25af981b6230870c8aa90dab5', imageFormData);
            const imageUrl = imageResponse.data.data.url;

            uploadData.set('image', imageUrl);

            const response = await api.post('register/', uploadData);
            toast.success(response.data.message);
            navigate('/login')
        } catch (error) {
            toast.error('There was an error registering the user!', {
                position: 'top-center'
            });
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container">
            <div className="wrapper">
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="select-box">
                        <select name="role" onChange={handleChange} required>
                            <option value="" disabled selected>Select Role</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Enter your username" name="username" onChange={handleChange} required />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Enter your first name" name="first_name" onChange={handleChange} required />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Enter your last name" name="last_name" onChange={handleChange} required />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Enter your email" name="email" onChange={handleChange} required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Create password" name="password" onChange={handleChange} required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Confirm password" name="confirm_password" onChange={handleChange} required />
                    </div>
                    {!isStudent && (
                        <div className="input-box">
                            <input type="text" placeholder="Specialization" name="specialization" onChange={handleChange} required />
                        </div>
                    )}
                    <div>
                        <input type="file" onChange={handleFileChange} name="image" />
                    </div>
                    {loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <div className="input-box button">
                            <input type="submit" value="Register Now" />
                        </div>
                    )}
                    <div className="text">
                        <h3>Already have an account? <Link to={'/login'}>Login now</Link></h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
