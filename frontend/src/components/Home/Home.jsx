
import React, { useEffect, useState } from 'react'
import Footer from './../Footer/Footer';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Link, useLocation } from 'react-router-dom';
import "./Home.css"
import { api } from '../../utlis/api';
import ProductCard from '../ProductCard/ProductCard';
export default function Home() {

  const [books, setBooks] = useState([]);
  const [categories, setcategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const searchTerm = query.get('search') || '';

  const getDataBook = async () => {
    try {
      const response = await api.get('/products');
      setBooks(response.data);
    } catch (error) {
      console.error('Error getting books:', error);
    }
  };


  const getDataCategories = async () => {
    try {
      const response = await api.get('/categories');
      setcategories(response.data);
    } catch (error) {
      console.error('Error getting books:', error);
    }
  };


  useEffect(() => {
    getDataBook();
    getDataCategories()
  }, []);


  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
    //|| book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* <p></p> */}
      <div id="carouselExampleCaptions" className="carousel slide ">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://printworksmarket.com/cdn/shop/files/Wedding_1.jpg?v=1744204059&width=2000" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Discounts</h5>
              <p>first offer.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://printworksmarket.com/cdn/shop/files/Wedding_1.jpg?v=1744204059&width=2000" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Discounts</h5>
              <p>second offer.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://printworksmarket.com/cdn/shop/files/Wedding_1.jpg?v=1744204059&width=2000" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Discounts</h5>
              <p>third offer.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
      </div>
      <p></p>
      <div className='container-fluid'>
        <div className=" d-flex justify-content-between align-items-center">
          <h2 className='m-2'>This week's highlights</h2>
          <Link variant="light" to='/shop' className="btn rounded-pill border m-2">Browse All</Link>
        </div>
        <div className='d-flex flex-wrap'>
          {books.map((item, index) => <div className='' key={item.id || index}>
              <ProductCard product={item} />
          </div>)}
        </div>
      </div>
      <p></p>
      <p></p>
      <div className='container-fluid'>
        <div className=" d-flex justify-content-between align-items-center ">
          <h2 className='m-2'>Top Categories</h2>
          <Link variant="light" to='/shop' className="btn rounded-pill border m-2">Browse All</Link>
        </div>
        <div className='row'>
          {categories.map((x) => <div className='col-lg-2' key={x.id}>
            <div className="card card-1 m-4" style={{ width: "10rem" }}>
              <Link to={`/category/${x.id}`}> 
              <h5 className="card-title text-center text-text-decoration-none text-white">{x.name}</h5>
              </Link>
         </div>
          </div>)}
        </div>
      </div>
      <p></p>
      <Footer />
    </>
  )
}
