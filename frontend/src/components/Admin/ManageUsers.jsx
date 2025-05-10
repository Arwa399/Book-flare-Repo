import AdminSidebar from '../AdminSideBar/AdminSidebar';
import { useState, useEffect } from "react";
import './ManageUsers.css';
import { api } from '../../utlis/api';
import toast from 'react-hot-toast';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [active, setActive] = useState(true);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get('admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addNewUser = async (userData) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token is missing");
      return;
    }
  
    try {
      const response = await api.post(`/admin/addUser`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      console.log("User added successfully:", response.data);
    } catch (error) {
      console.error("Error adding user:", error.response ? error.response.data : error.message);
    }
  };

  const updateUser = async (id, userData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      const response = await api.patch(`admin/users/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user:", error.response ? error.response.data : error.message);
    }
  };

  const resetForm = (e) => {
    setName('');
    setEmail('');
    setPassword('');
    setId(null);
    setPhone('');
    setAddress('');
    setRole('');
    setActive(true);
    if (e) e.target.reset();
  };
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (username && email && password) {
      const userData = {
        username,
        email,
        password,
        phone,
        address,
        role,
        active
      };

      try {
        if (id) {
          await updateUser(id, userData);
        } else {
          await addNewUser(userData);
        }
        resetForm(e);
        getUsers();
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  };


  const handleEdit = (user) => {
    setName(user.username || user.name);
    setEmail(user.email);
    setPassword(user.password);
    setId(user.id);
    setPhone(user.phone);
    setAddress(user.address);
    setRole(user.role);
    setActive(user.active);
  };
  

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token"); 
    
    if (!token) {
      console.error("Token is missing");
      return;
    }
  
    try {
     const response = await api.patch(`admin/users/deactivate/${id}`, null, {  
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User has been deactivated successfully!");

      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to deactivate user.");
    }
  };
  

  return (
    <div className="d-flex">
    <div className="admin-sidebar-container">
      <AdminSidebar />
    </div>
      <div className="container-fluid my-5 m-5" style={{ marginLeft: '200px', paddingTop: '50px' }}>
        <h2>Manage Users</h2>

        <form onSubmit={handleAddUser} className="mb-5">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>


          <div className="mb-3">
            <label className="form-label">Address</label>
            <input 
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input 
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-control"
              value={role}    //type ??
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>


          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={active}    //type ??
              onChange={(e) => setActive(e.target.value === "true")}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <button className="btn btn-primary">
            {id ? 'Update User' : 'Add User'}
          </button>
        </form>

        <h3>Users List</h3>
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>{user.name || user.username}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.active ? "Active" : "Inactive"}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(user)} 
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
