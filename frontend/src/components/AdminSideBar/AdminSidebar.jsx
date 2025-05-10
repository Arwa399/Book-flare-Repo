import React from 'react'
import { Link } from "react-router-dom";
import './AdminSidebar.css'

export default function AdminSidebar() {
  return (
    <div className="sidebar d-flex flex-column p-3 vh-100 " style={{ top: '60px', height: 'calc(100vh - 56px)', width: '250px' }}>
      <h2 className='text-center text-white'>Admin</h2>
      <ul className="nav nav-pills flex-column mb-auto mt-4">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <hr/>
        <li>
          <Link to="/products" className="nav-link">Manage Books</Link>
        </li>
        <hr/>
        <li>
          <Link to="/admin/users" className="nav-link">Manage Users</Link>
        </li>
      </ul>
    </div>
  );
}