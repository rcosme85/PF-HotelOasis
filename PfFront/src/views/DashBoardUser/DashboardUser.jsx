import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import MisDatos from "./MisDatos.jsx";
import Reserve from "./Reserve";
import CheckReserva from "./CheckReserva.jsx";
import DashboardComponent from "./DashboardComponent.jsx";
import ShowsReviews from "./ShowsReviews.jsx";

const DashboardUser = () => {
  const name = useSelector((state) => state.auth.displayName);
  const imageOfProfile = useSelector((state) => state.auth.photoURL);
  const [sidenav, setSidenav] = useState(true);
  const [showReserve, setShowReserve] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  //---------HANDLES-------------//
  const handleShowRerves = () => {
    setShowReserve(true);
    setShowDate(false);
    setShowDashboard(false);
    setShowReviews(false);
    setShowCheck(false);
  };
  const handleShowDashboard = () => {
    setShowDashboard(true);
    setShowReserve(false);
    setShowCheck(false);
    setShowDate(false);
    setShowReviews(false);
    setShowCheck(false);
  };
  const handleShowDates = () => {
    setShowDashboard(false);
    setShowReserve(false);
    setShowDate(true);
    setShowCheck(false);
    setShowReviews(false);
  };
  const handleShowReviews = () => {
    setShowDashboard(false);
    setShowReserve(false);
    setShowDate(false);
    setShowReviews(true);
    setShowCheck(false);
  };

  const handleShowCheck = () => {
    setShowCheck(true);
    setShowDashboard(false);
    setShowReserve(false);
    setShowDate(false);
    setShowReviews(false);
  };

  return (
    <>
      <div className="font-poppins antialiased min-h-screen flex">
        <div
          id="view"
          className={`gap-10 mt-10 h-full w-screen flex flex-col md:flex-row`}
        >
          <div
            id="sidebar"
            className={`bg-white border-gray-100 w-60 md:w-72 lg:w-80 px-6 py-8 sm:w-16 transition-transform duration-300 ease-in-out transform ${
              sidenav ? "translate-x-0" : "-translate-x-full"
            } absolute left-0 z-10`}
            style={{ height: "95%" }}
          >
            <div className="space-y-6 md:space-y-10">
              <h1 className="font-bold text-4xl text-center md:hidden">
                D<span className="text-teal-600">.</span>
              </h1>
              <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                Oasis<span className="text-teal-600">.</span>
              </h1>
              <div id="profile" className="space-y-3">
                <img
                  src={imageOfProfile}
                  alt="Avatar user"
                  className="w-10 md:w-16 rounded-full mx-auto"
                />
                <div>
                  <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                    {name}
                  </h2>
                  <p className="text-xs text-gray-500 text-center">Usuario</p>
                </div>
              </div>
              <div id="menu" className="flex  flex-col items-start space-y-2">
                <button
                  onClick={handleShowDashboard}
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="">Dashboard</span>
                </button>
                <button
                  onClick={handleShowDates}
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                  <span className="">Mis datos</span>
                </button>

                <button
                  onClick={handleShowRerves}
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                  </svg>
                  <span className="">Mis Reservas</span>
                </button>
                <button
                  onClick={handleShowCheck}
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="">Check-in y Check-out</span>
                </button>
                <button
                  onClick={handleShowReviews}
                  className=" flex text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>

                  <span className="">Mis reseñas</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 md:ml-72 lg:ml-80 ">
            {showReserve ? (
              <div>
                <Reserve />
              </div>
            ) : (
              ""
            )}
            {showDate && <MisDatos />}
            {showDashboard && <DashboardComponent 
            check={handleShowCheck}
            datos={handleShowDates}
            reserve={handleShowRerves}
            reviews={handleShowReviews} />}
            {showReviews && <ShowsReviews />}
            {showCheck ? <CheckReserva /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardUser;
