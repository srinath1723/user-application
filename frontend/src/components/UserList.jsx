import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await axios.get('http://localhost:5000/users');
            setUsers(result.data);
        };
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:5000/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
    };

    return (
        <div className="user-list-container">
            <Link to="/add" className="add-user-link">Add New User</Link>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user._id} className="user-list-item">
                        <div className="user-details">
                            <span>{user.firstName} {user.lastName}</span> <br/>
                            {user.email} <br/>
                            {user.phone} <br/>
                            {user.address}
                        </div>
                        <div className="user-actions">
                            <Link to={`/edit/${user._id}`} className="edit-link">Edit</Link>
                            <button className="delete-btn" onClick={() => deleteUser(user._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
