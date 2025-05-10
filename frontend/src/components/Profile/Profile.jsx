import React, { useEffect, useState } from 'react';
import { api } from '../../utlis/api';
import { FaUserCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/users/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(res.data);
                setUser(res.data.user); 
                setEditedUser(res.data.user); 
            } catch (err) {
                console.error(err);
                setError('Failed to load profile.');
            }
        };

        fetchUser();
    }, []);


    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    const handleEdit = () => {
        setIsEditing(true);
        setEditedUser({ ...user });
    };

    const handleSave = async () => {
        try {
            const res = await api.patch(`/users/${user.id}`, editedUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUser(res.data.user);  
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            setError('Failed to save profile.');
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="profile-card p-4 shadow rounded-4 bg-white">
                <div className="text-center mb-4">
                    <FaUserCircle size={100} className="text-primary" />
                    <h3 className="mt-3">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedUser?.username}
                                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                            />
                        ) : (
                            user?.username
                        )}
                    </h3>
                </div>

                <hr />

                <div className="info">
                    <p>
                        <FaEnvelope className="me-2 text-muted" />
                        <strong>Email:</strong>
                        {isEditing ? (
                            <input
                                type="email"
                                value={editedUser?.email}
                                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                            />
                        ) : (
                            user?.email
                        )}
                    </p>

                    <p>
                        <FaPhoneAlt className="me-2 text-muted" />
                        <strong>Phone:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedUser?.phone}
                                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                            />
                        ) : (
                            user?.phone
                        )}
                    </p>

                    <p>
                        <FaMapMarkerAlt className="me-2 text-muted" />
                        <strong>Address:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedUser?.address}
                                onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                            />
                        ) : (
                            user?.address
                        )}
                    </p>
                </div>

                <div className="text-center mt-4">
                    {isEditing ? (
                        <button className="btn btn-success" onClick={handleSave}>
                            Save Changes
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleEdit}>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
