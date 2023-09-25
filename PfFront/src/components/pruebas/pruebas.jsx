import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const ReviewStars = () => {
    const reviewId = useSelector(state=>state.auth.uid)
  const [reviews, setReviews] = useState([]);
  const [reviewsDb, setReviewsDb] = useState([]);
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });

  
  const handleRatingChange = (value) => {
    setReview({ ...review, rating: value });
  };

  const handleCommentChange = (event) => {
    setReview({ ...review, comment: event.target.value });
  };

  const handleSubmit = async () => {
    // Guardar la revisión actual en el array de revisiones
    try {
    setReviews([...reviews, review]);
       await axios.post(`${import.meta.env.VITE_API_URL}/hotel/reviews`,{
            usuarioId:reviewId,
            rating:review.rating,
            comentario:review.comment,
            deleted:false
        })
        console.log("REVIEW CREADA");
    } catch (error) {
        
    }
    try {
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/reviews`)
        const response = request.data.data
        setReviewsDb(response)
        setReviewsDb([...reviewsDb, review]);
        // Reiniciar la revisión actual
        setReview({ rating: 0, comment: '' });
    } catch (error) {
        
    }

  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((value) => (
  <label
    key={value}
    className={`cursor-pointer ${
      value <= review.rating ? 'text-purple-600' : 'text-gray-400'
    }`}
  >
    <input
      type="radio"
      name="rating"
      value={value}
      onChange={() => handleRatingChange(value)}
      className="sr-only"
    />
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </label>
))}
      </div>
      <textarea
        placeholder="Escribe tu comentario aquí..."
        value={review.comment}
        onChange={handleCommentChange}
        className="w-full px-3 py-2 border rounded-md"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
      >
        Enviar
      </button>
      {reviews.length > 0 && (
        <div className="mt-4">
          <h2>Reviews anteriores:</h2>
          <ul>
          {reviewsDb.map((r, index) => (
    <li key={index}>
      <p>Calificación: 
        {[1, 2, 3, 4, 5].map((value) => (
          <svg
            key={value}
            xmlns="http://www.w3.org/2000/svg"
            fill={value <= r.rating ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-4 h-4 inline ${
              value <= r.rating ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        ))}
      </p>
      <p>Comentario: {r.comment}</p>
    </li>
  ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewStars;
