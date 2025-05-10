import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import axios from 'axios';
import { api } from '../../utlis/api';

function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get(`/products/review/${productId}`)
      .then(res => setReviews(res.data.reviews))
      .catch(err => console.error(err));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/products/review', {
      productId,
      rating,
      comment
    }).then(() => {
      setRating(0);
      setComment('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      // Refresh reviews
      api.get(`/reviews/${productId}`)
        .then(res => setReviews(res.data));
    }).catch(err => console.error(err));
  };

  console.log(reviews)
  return (
    <div className="mt-4">
      <h5>Leave a Review</h5>
      {success && <div className="alert alert-success">Review submitted!</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Your Rating:</label>
          <ReactStars count={5} value={rating} onChange={setRating} size={24} color2={'#ffd700'} />
        </div>
        <div className="mb-2">
          <label>Your Comment:</label>
          <textarea className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={rating === 0}>Submit</button>
      </form>

      <hr />
      <h6>Previous Reviews</h6>
      {reviews?.length === 0 ? <p>No reviews yet.</p> : reviews?.map((rev, i) => (
        <div key={i} className="card mb-2 p-2">
          <ReactStars count={5} value={rev.rating} size={18} edit={false} color2={'#ffd700'} />
          <p>{rev.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductReviews;