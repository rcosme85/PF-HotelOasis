import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ReviewAdmin = () => {
  const userEmail = useSelector((state) => state.auth.email);
  const [reviews, setReviews] = useState([]);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel/reviews/`
        );
        const reviewsData = response.data.data;

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error al obtener las revisiones:", error);
      }
    };

    fetchReviews();
  }, []);

  const isAdmin = userEmail === "pf.henry40a@gmail.com";

  const handleDeleteReview = (reviewId) => {
    setReviewToDelete(reviewId);
  };

  const handleConfirmDeleteReview = async () => {
    if (reviewToDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/hotel/reviews/${reviewToDelete}`
        );

        // Elimina la revisión del estado local
        const updatedReviews = reviews.filter(
          (review) => review.id !== reviewToDelete
        );
        setReviews(updatedReviews);

        // Restablece el estado
        setReviewToDelete(null);
      } catch (error) {
        console.error("Error al borrar la revisión:", error);
      }
    }
  };

  return (
    <>
      {isAdmin && (
        <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="m-10 bg-[#16242f] p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-slate-800 transition duration-300 ease-in-out"
            >
              <div className="mb-2 flex-grow">
                <span className="text-white font-light">
                  {review.comentario}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-base mt-2">
                {Array(review.rating)
                  .fill(null)
                  .map((_, index) => (
                    <span key={index} className="text-yellow-500 text-3xl">
                      ★
                    </span>
                  ))}
              </div>
              <div className="font-semibold text-gray-100 font-serif">
                <span>{review.Usuario?.nombre}</span>{" "}
                <span>
                  {review.Usuario?.apellido !== "Sin apellido" &&
                    review.Usuario?.apellido}
                </span>
              </div>
              <div className="mt-2">
                <button
                  className="bg-red-800 text-white px-3 py-1 rounded-md hover:bg-red-700 ml-2"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {reviewToDelete !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-white p-4 mx-4 md:mx-auto rounded-lg w-full md:w-96">
            <p>¿Seguro que quieres borrar esta revisión?</p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmDeleteReview}
                className={`px-4 py-2 text-white bg-red-800 rounded-md hover:bg-red-700 mr-2`}
              >
                Sí, Borrar
              </button>
              <button
                onClick={() => setReviewToDelete(null)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewAdmin;
