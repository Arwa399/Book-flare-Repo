import AdminSidebar from '../AdminSideBar/AdminSidebar';
import { useState, useEffect } from "react";
import './ManageBooks.css';
import { api } from '../../utlis/api';
import toast from 'react-hot-toast';

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [stockLevel, setStockLevel] = useState('');
  const [id, setId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  

  const getCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("Error fetching categories: ", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getBooks = async () => {
    try {
      const res = await api.get('/products');
      console.log(res.data);
      setBooks(res.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  const createFormData = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', parseFloat(price));;
    formData.append('description', description);
    formData.append('stockLevel', parseInt(stockLevel));
    formData.append('categoryId', categoryId);
    if (image) {
      formData.append('file', image);
    }
    return formData;
  };

  const addNewBook = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(`/admin/product/category/${categoryId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBook = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing");
        return;
      }

      console.log(formData)

       const response = await api.patch(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book updated successfully:',  response.data);
      getBooks();
    } catch (error) {
      console.log('Error updating book:', error.response ? error.response.data : error.message);
    }
  };

  const resetForm = (e) => {
    setName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setStockLevel('');
    setId(null);
    setIsEditing(false);
    setCategoryId("");
    if (e) e.target.reset();
  };


  const handleAddBook = async (e) => {
    e.preventDefault();
    console.log(name ,stockLevel ,description , price , image)
    if (name && stockLevel && description && price && image) {
      const formData = createFormData();

      try {
        if (id) {
          console.log(id)
          await updateBook(id, formData);
        } else {
          await addNewBook(formData);
        }
        resetForm(e);
        getBooks();
      } catch (error) {
        console.error('Error saving book:', error);
      }
    }
  };

  const handleEdit = (book) => {
    console.log(book)
    setName(book.name);
    setPrice(book.price);
    setDescription(book.description);
    setImage(book.image); 
    setStockLevel(book.stockLevel);
    setCategoryId(book.categoryId);
    setId(book.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Book has been deleted successfully!");
      getBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error("Failed to delete book.");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="container-fluid mt-4" style={{ marginLeft: '250px', paddingTop: '60px' }}>
        <h2 className='my-4'>Manage Books</h2>
        <form onSubmit={handleAddBook} className="mb-5" encType="multipart/form-data">
        <div className="row">
        <div className="col-md-6 mb-3">
            <label className="form-label">Book Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter book name"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            ></textarea>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="file"
            name="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="col-md-6 mb-3">
            <label className="form-label">Stock Level</label>
            <input
              type="number"
              className="form-control"
              min="0"
              value={stockLevel || ''}
              onChange={(e) => setStockLevel(e.target.value)}
            />
          </div>
          </div>
{/* 
              {!isEditing &&
          <button className="btn" onClick={addNewBook}>
           Add Book
          </button> }
          
              {isEditing &&
          <button className="btn" onClick={updateBook}>
           Update Book
          </button> } */}

          {!isEditing && (
            <button type="submit" className="btn btn-primary">
              Add Book
            </button>
          )}

          {isEditing && (
            <button type="submit" className="btn btn-warning">
              Update Book
            </button>
          )}

        </form>
      <h3 className="my-4">Books List</h3>
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
          <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Stock Level</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(books) && books.map((book, idx) => (
              <tr key={book.id || idx}>
                <td>{idx + 1}</td>
                <td>{book.name}</td>
                <td>${book.price}</td>
                <td>{book.description}</td>
                <td>
                  <img
                    src={`http://localhost:3000/uploads/${book.image}`}
                    alt="Book"
                    width="50"
                    height="50"
                    style={{ objectFit: 'cover' }}
                  />
                </td>
                <td>{book.stockLevel}</td>
                <td>
                  <button onClick={() => handleEdit(book)} className="btn btn-warning btn-sm me-2">
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(book.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
