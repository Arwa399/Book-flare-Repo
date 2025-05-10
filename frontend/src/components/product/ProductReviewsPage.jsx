import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductReviewsPage() {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/reviews/${productId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [productId]);

  return (
    <div className="container mt-5">
      <h2>All Reviews for Product #{productId}</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((rev, i) => (
          <div key={i} className="card mb-3 p-3">
            <ReactStars count={5} value={rev.rating} size={20} edit={false} color2={'#ffd700'} />
            <p>{rev.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
