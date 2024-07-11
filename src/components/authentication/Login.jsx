import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import useAuth from '../../customHooks/useAuth';

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('login/', formData);
            login(response.data)
            toast.success('Login successful!');
            navigate('/')
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="container">
            <div className="wrapper">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <div className="input-box button">
                            <input type="submit" value="Login Now" />
                        </div>
                    )}

                    <div className="text">
                        <h3>Don&apos;t have an account? <Link to="/register">Register Now</Link></h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
