import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewsCarrousel = () => {
  const [reviews, setReviews] = useState();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isIntervalRunning, setIsIntervalRunning] = useState(true);
  const intervalDuration = 1500;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel/reviews/`
        );

        const reviewsData = response.data.data;
        const reviewFalse = reviewsData.filter(
          (review) => review.deleted === false
        );
        setReviews(reviewFalse);
      } catch (error) {
        console.error("Error al obtener las revisiones:", error);
      }
    };

    fetchReviews();
  }, []);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/reviews`);
  //       // setReviews(response.data.data);
  //     } catch (error) {
  //       console.error("Error al obtener las reseñas:", error);
  //     }
  //   };

  //   fetchReviews(); // Llamar a la función para obtener las revisiones inicialmente
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isIntervalRunning) {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews?.length);
      }
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
  }, [reviews, isIntervalRunning]);

  if (!reviews || reviews.length === 0 || !reviews[currentReviewIndex]) {
    return null;
  }

  const currentReview = reviews[currentReviewIndex];

  const handleMouseDown = () => {
    setIsIntervalRunning(false);
  };

  const handleMouseUp = () => {
    setIsIntervalRunning(true);
  };

  if (!currentReview) {
    return null;
  }
  return (
    <div className="mx-auto max-w-2xl lg:max-w-4xl mb-16">
      <div
        className="p-6 bg-[#16242f] dark:bg-blue  rounded-lg overflow-hidden shadow-xl relative h-96"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        <div className="relative z-10 flex flex-col justify-center h-full">
          <div className="flex items-center justify-center">
            <img className="h-12" src="./logo.jpg" alt="" />
            <span className="ml-4 text-2xl font-semibold text-white">
              OASIS HOTEL
            </span>
          </div>
          <figure className="mt-10">
            <blockquote className="text-center text-lg font-semibold leading-8 sm:text-lg sm:leading-9 text-white overflow-y-auto max-h-40">
              <p>"{currentReview.comentario}"</p>
            </blockquote>
            <figcaption className="mt-10">
              <div className="mx-auto">
                <div className="flex items-center justify-center space-x-3 text-base">
                  {Array(currentReview.rating)
                    .fill(null)
                    .map((_, index) => (
                      <span key={index} className="text-yellow-500 text-3xl">
                        ★
                      </span>
                    ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-white">
                  <span>{currentReview.Usuario?.nombre}</span>{" "}
                  <span>
                    {currentReview.Usuario?.apellido !== "Sin apellido" &&
                      currentReview.Usuario?.apellido}
                  </span>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCarrousel;
