import React, { useEffect, useState } from 'react'
import AdminSidebar from '../AdminSideBar/AdminSidebar';
import './DashBoard.css'
import { api } from '../../utlis/api';
export default function DashBoard() {

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const res = await api.get('/products');
      console.log(res.data)
      setBooks(res.data);

    } catch (error) {
      console.log(error)
    }


  };


  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    getUsers();
  }, []);


  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="content flex-grow-1 p-4" style={{ marginLeft: '250px',marginTop: '60px' }}>
        <h1>Dashboard</h1>
        <p>Welcome Admin! 👋</p>

        <h3>Books List</h3>
<div className="table-responsive">
          <table className="table table-bordered table-striped align-middle text-center">
            <thead>
              <tr>
                <th>id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Stock Level</th>
              </tr>
            </thead>

          <tbody>
            {books.map((book, id) => (
              <tr key={book.id}>
                <td>{id + 1}</td>
                <td>
                  <img src={`http://localhost:3000/uploads/${book.image}`} alt="Book" width="50" height="50" style={{ objectFit: 'cover' }} />
                </td>
                <td>{book.name}</td>
                <td>${book.price}</td>
                <td>{book.description}</td>
                <td>{book.stockLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
</div>

        <h3>Users List</h3>
        <div className='table-responsive'></div>
        <table className="table table-bordered table-striped align-middle text-center">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, id) => (
              <tr key={user.id}>
                <td>{id + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </div>
  );
}









// logout function
// const logout = () => {
//     localStorage.removeItem('isAdmin');
//     navigate('/login');
//   };