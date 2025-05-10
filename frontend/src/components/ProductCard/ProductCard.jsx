import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../utlis/api";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {

  const addProductToCart = async ()=> {
    try {
      const res =await api.post('/cart/items', {productId: product.id })
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <>
      <div className="card m-4 fw-bold" style={{ width: "20rem" }}>
        <img src={`http://localhost:3000/uploads/${product.image}`} className="card-img-top" alt="..." />
        <div className="card-body">
          <h3 className="card-title">name : {product.name}</h3>
          <h5 className="card-text"> description : {product.description}</h5>
          <h5 className="card-text">Price: {product.price}$</h5>
          <h5 className="card-text">max quantity : {product.stockLevel}</h5>

          <div className="d-flex flex-column btn-group-sm">
            <Link to={`/products/${product.id}`}>
            <button  className="btn w-75">
              See Details
            </button>
            </Link>

            <button onClick={addProductToCart} className="btn mx-auto w-75 mt-2">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
