import {React, useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { api } from '../../utlis/api';

export default function Category() {
    
    const [books, setBooks] = useState([]);
    const {categoryId} = useParams();
    const location = useLocation()
    const getCategoryBooks = async () => {
        try {
          const res = await api.get(`/categories/${categoryId}`);
          setBooks(res.data);
        } catch (error) {
          console.error('Error fetching books by category:', error);
        }
      };
         
           useEffect(()=>{
            getCategoryBooks();
           }, [categoryId]);


           console.log(location)

  return (
    <>
    
   <div className='container5 m-2' >
    <h1 className='text-center'>{location.state?.name} Books</h1>
    <p className='text-center'>Discover your favorite book, you will find a wide range of your selected book's category from bestseller
    to newcomer.</p>
    
    <div className='row'>
        {books.map((x)=> <div className='col-lg-3' key={x.id}>

        <div className="card m-4" style={{width: "18rem"}}>
          <img src={x.image} className="card-img-top" alt="..."/>
          <div className="card-body">
          <h5 className="card-title">{x.title}</h5>
          <p className="card-text">{x.descreption}</p>
          <div className='d-flex flex-column btn-group-sm'>
          <a href="/products/:id" className="btn ">See Detailes</a>
          <button href="#" className="btn m-2">Add To Cart</button>
          </div>
          </div>
        </div>
      </div>)}
      </div>   
      </div>
    <Footer/>
    </>
  )
}