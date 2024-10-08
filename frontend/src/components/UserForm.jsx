import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = ({ isEditing = false }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (isEditing && id) {
            const fetchUser = async () => {
                const result = await axios.get(`http://localhost:5000/users/${id}`);
                setFormData(result.data);
            };
            fetchUser();
        }
    }, [isEditing, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error message
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/users/${id}`, formData);
            } else {
                await axios.post('http://localhost:5000/users', formData);
            }
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Set error message from backend
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className="container">
            <h2>{isEditing ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                />
                
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}
                
                <button type="submit">{isEditing ? 'Update' : 'Create'} User</button>
            </form>
        </div>
    );
};

export default UserForm;
