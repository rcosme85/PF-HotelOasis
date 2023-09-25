import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReviewUser = () => {
  const reviewId = useSelector((state) => state.auth.uid);
  // const userEmail = useSelector((state) => state.auth.email);
  const [usersList, setUsersList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  const [charCount, setCharCount] = useState(200);
  const [showReviewForm, setShowReviewForm] = useState(false);
  // const [editingReviewId, setEditingReviewId] = useState(null);
  // const [editReview, setEditReview] = useState({});
  // const [isEditing, setIsEditing] = useState(false);
  const [canWriteReview, setCanWriteReview] = useState(false);
  const [error, setError] = useState(false);
  // const [epopPup, setepopUp] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel/users/`
        );

        const users = response.data.data;

        setUsersList(users);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel/reviews/`
        );
        const reviewsData = response.data.data;

        const filterReview = reviewsData.filter(
          (f) => f.UsuarioId === reviewId
        );

        setReviews(filterReview);
      } catch (error) {
        console.error("Error al obtener las revisiones:", error);
      }
    };

    const fetchReservationDate = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/hotel/filtros/reservaPorUsuario/${reviewId}`
        );

        const reservations = response.data.data;

        const firstReservation = reservations[0];
        const departureDate = new Date(firstReservation.fechaSalida);

        // Comprobar si la fecha de salida es menor o igual a la fecha actual
        const currentDate = new Date();
        setCanWriteReview(currentDate >= departureDate);
      } catch (error) {
        console.error(
          "Error al obtener la fecha de salida de la reserva:",
          error
        );
      }
    };

    fetchUserData();
    fetchReviews();
    fetchReservationDate();
  }, [reviewId]);

  const handleRatingChange = (value) => {
    setReview({ ...review, rating: value });
    setError(false);
  };

  const handleCommentChange = (event) => {
    const inputText = event.target.value;
    const remainingChars = 200 - inputText.length;
    setCharCount(remainingChars);
    if (remainingChars >= 0) {
      setReview({ ...review, comment: inputText });

      if (inputText.length >= 5) {
        setError(false);
      }
    } else {
      setError(true);
    }
  };

  // const handleEditReview = (reviewId) => {
  //   const reviewToEdit = reviews.find((r) => r.id === reviewId);
  //   setEditingReviewId(reviewId);
  //   setEditReview({ ...reviewToEdit, comment: reviewToEdit.comentario });
  //   setIsEditing(true); // Mostrar el popup al editar
  // };

  // const handleSaveReview = async () => {
  //   if (editReview.comment.length < 5) {
  //     setepopUp(true);
  //     return;
  //   }
  //   try {
  //     await axios.put(
  //       `${import.meta.env.VITE_API_URL}/hotel/reviews/${editingReviewId}`,
  //       {
  //         rating: editReview.rating,
  //         comentario: editReview.comment,
  //       }
  //     );
  //     const updatedReviews = reviews.map((review) =>
  //       review.id === editingReviewId ? { ...review, ...editReview } : review
  //     );
  //     setReviews(updatedReviews);
  //     setEditingReviewId(null);
  //     setEditReview({});
  //     setepopUp(false);
  //   } catch (error) {
  //     console.error("Error al editar la revisión:", error);
  //   }
  // };

  const handleSubmit = async () => {
    if (review.comment.length < 5 || review.rating === 0) {
      setError(true);
      console.log(error);
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/hotel/reviews`, {
        UsuarioId: reviewId,
        rating: review.rating,
        comentario: review.comment,
        deleted: false,
      });

      setShowNotification(true);

      console.log("REVIEW CREADA");
      setCharCount(200);
      setReview({ rating: 0, comment: "" });
      setShowReviewForm(false);
      setError(false);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/"); // Cambia esto a tu URL de inicio real
      }, 2000); // 5000 milisegundos = 5 segundos
    } catch (error) {
      console.log(error);
    }
    // const pedido = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/hotel/reviews/`
    //     );
    //     const reviewsData = response.data.data.filter(
    //       (f) => f.UsuarioId === reviewId
    //     );
    //     setReviews(reviewsData);
    //   } catch (error) {
    //     console.error("Error al obtener las revisiones:", error);
    //   }
    // };
    // pedido();
  };

  // const handleDeleteReview = (reviewId) => {
  //   const confirmDelete = window.confirm(
  //     "¿Seguro que quieres borrar esta revisión?"
  //   );
  //   if (confirmDelete) {
  //     deleteReview(reviewId);
  //   }
  // };

  // const deleteReview = async (reviewId) => {
  //   try {
  //     await axios.delete(
  //       `${import.meta.env.VITE_API_URL}/hotel/reviews/${reviewId}`
  //     );
  //     const updatedReviews = reviews.filter((review) => review.id !== reviewId);
  //     setReviews(updatedReviews);
  //   } catch (error) {
  //     console.error("Error al borrar la revisión:", error);
  //   }
  // };

  return (
    <div className="mt-5 space-y-4">
      <>
        <div>
          {/* <div className="text-center">
            <button
              className="bg-[#16242f] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded "
              onClick={() => setShowReviewForm(true)}
            >
              DEJANOS TU OPINION
            </button>
          </div> */}

          <div className="max-w-md mx-auto p-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label
                    key={value}
                    className={`cursor-pointer ${
                      value <= review.rating
                        ? "text-purple-600"
                        : "text-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={value}
                      onChange={() => handleRatingChange(value)}
                      className="sr-only"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </label>
                ))}
              </div>
              <textarea
                placeholder="Escribe tu comentario aquí..."
                value={review.comment}
                onChange={handleCommentChange}
                className="w-full px-3 py-2 border rounded-md max-w-full overflow-x-auto"
                maxLength={200}
              ></textarea>

              <span className="text-sm text-right text-gray-400">
                Caracteres restantes: {charCount}
              </span>
              {error && (
                <span className="text-red-500">
                  Faltan caracteres o no has seleccionado una estrella.
                </span>
              )}

              <button
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                onClick={handleSubmit}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        {showNotification && (
          <div className="bg-green-500 text-white p-2 text-center">
            ¡Tu revisión se ha enviado correctamente!
          </div>
        )}
      </>

      {/* <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="m-10 bg-[#16242f] p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-slate-800 transition duration-300 ease-in-out"
          >
            <div className="mb-2 flex-grow">
              <span className="text-white font-light">{review.comentario}</span>
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
            <div className="mt-2">
              <button
                className="bg-[#16242f] text-white px-3 py-1 rounded-md hover:bg-gray-700"
                onClick={() => handleEditReview(review.id)}
              >
                Editar
              </button>
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

      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-white p-4 mx-4 md:mx-auto rounded-lg w-full md:w-96">
            <form>
              <div className="mb-4">
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      className={`cursor-pointer ${
                        value <= editReview.rating
                          ? "text-yellow-600"
                          : "text-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        onChange={() =>
                          setEditReview({ ...editReview, rating: value })
                        }
                        className="sr-only"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 inline-block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  value={editReview.comment}
                  onChange={(e) =>
                    setEditReview({
                      ...editReview,
                      comment: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md max-w-full min-h-[150px] overflow-x-auto"
                ></textarea>

                <span className="text-sm text-right text-gray-400">
                  Caracteres restantes: {charCount}
                </span>
                {epopPup && (
                  <span className="text-red-500">
                    Faltan caracteres o no has seleccionado una estrella.
                  </span>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveReview}
                    className={`px-4 py-2 text-white bg-[#16242f] rounded-md hover:bg-gray-700 mr-2`}
                    disabled={review.comment.length > 5}
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ReviewUser;
