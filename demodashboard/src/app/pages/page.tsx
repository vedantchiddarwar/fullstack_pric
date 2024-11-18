'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
}

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data } = await axios.get('/api/users'); // Adjust URL for API
        setUsers(data);
    };

    const handleAddUser = async () => {
        await axios.post('/api/users', { name, email });
        fetchUsers();
    };

    const handleUpdateUser = async (id: string) => {
        const newName = prompt('Enter new name');
        const newEmail = prompt('Enter new email');
        if (newName && newEmail) {
            await axios.put(`/api/users/${id}`, { name: newName, email: newEmail });
            fetchUsers();
        }
    };

    const handleDeleteUser = async (id: string) => {
        await axios.delete(`/api/users/${id}`);
        fetchUsers();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">User Dashboard</h1>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2">Add User</button>
            </div>
            <ul className="mt-4">
                {users.map((user) => (
                    <li key={user.id} className="flex justify-between items-center p-2 border-b">
                        <div>
                            <p>{user.name} ({user.email})</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleUpdateUser(user.id)}
                                className="bg-yellow-500 text-white px-2 py-1 mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-500 text-white px-2 py-1"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
