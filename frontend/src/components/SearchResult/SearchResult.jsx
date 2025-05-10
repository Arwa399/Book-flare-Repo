import React from 'react'
import { useLocation } from 'react-router'
import ProductCard from '../ProductCard/ProductCard';

export const SearchResult = () => {
    const location = useLocation()
    console.log(location);
    
  return (
    <div>{location.state?.books?.map(item=> <ProductCard product={item}/>)}</div>
  )
}
