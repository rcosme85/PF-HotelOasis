import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pool from "../../assets/imgHome/pool.png";
import wifi from "../../assets/imgHome/wifi.png";
import taxi from "../../assets/imgHome/taxi.png";
import bf from "../../assets/imgHome/breakfast.png";
import axios from "axios";
import SearchBox from "../../components/SearchBox/SearchBox";
import AboutUs from "../AboutUs/AboutUs";
import ReviewsCarrousel from "../ReviewsCarrousel/ReviewsCarrousel";

import CorreoForm from "../../components/ContactForm/CorreoForm";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const Home = () => {
  const [data, setData] = useState([]);
  // console.log('env',import.meta.env.VITE_API_URL)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/hotel/subtipo`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div
        className="w-full h-96 flex items-center justify-center"
        style={{ height: "40rem" }}
      >
        <div
          className="absolute bg-black/60 h-96 w-full  flex items-center justify-center"
          style={{ height: "40rem" }}
        >
          <h2 className="text-7xl bg-gradient-to-r from-blue-500 via-orange-500 to-green-500 text-transparent bg-clip-text stroke-black-500 ">
            Oasis Hotel
          </h2>
        </div>

        <img
          src="https://images.unsplash.com/photo-1587213811864-46e59f6873b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex relative z-10 -mt-14">
        <SearchBox />
      </div>

      <div className="flex mt-16 items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-40">
          {data.map((item) => (
            <div
              key={item.id}
              className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow"
            >
              <div className="h-96 w-72">
                <img
                  className="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 transition-all duration-700">
                <h1 className="text-4xl font-bold text-white bg-orange">
                  {item.subTipo}
                </h1>
                <p className="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {item.descripcion}
                </p>
                <button className="rounded-full shadow shadow-white/60 bg-neutral-500 py-2 px-3.5 text-sm capitalize text-white">
                  <Link to={`/details/${item.subTipo}`}>Ver más</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center  m-16">
        <p className="font-mono text-center text-5xl font-semibold dark:text-white ">
          Nuestros Servicios
        </p>
        <p className="font-sans md:system-ui mt-3 text-center text-lg  text-gray-800  dark:text-white">
          Oasis Hotel te ofrece todos los servicios que necesitas.
        </p>
      </div>

      <div className="w-4/5 mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 place-content-center">
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <img src={pool} alt="Piscina" className="w-15 h-15 mb-2 mx-auto" />
          <div className="flex flex-col items-center w-48">
            <p className="text-lg font-semibold dark:text-white">Piscina</p>
            <p className="mt-2 text-sm break-words dark:text-white">
              Disfruta de un refrescante baño junto a la piscina. El lugar
              perfecto para relajarte.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <img
            src={wifi}
            alt="WiFi Gratis"
            className="w-15 h-15 mb-2 mx-auto"
          />
          <div className="flex flex-col items-center w-48">
            <p className="text-lg font-semibold dark:text-white">WiFi Gratis</p>
            <p className="mt-2 text-sm break-words dark:text-white">
              Mantente conectado en nuestro Hotel con WiFi gratuito.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <img
            src={taxi}
            alt="Traslado al Aeropuerto"
            className="w-15 h-15 mb-2 mx-auto"
          />
          <div className="flex flex-col items-center w-48">
            <p className="text-lg font-semibold dark:text-white">
              Traslado al Aeropuerto
            </p>
            <p className="mt-2 text-sm break-words dark:text-white">
              Traslados seguros desde el aeropuerto para tu comodidad.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <img src={bf} alt="Desayuno" className="w-15 h-15 mb-2 mx-auto" />
          <div className="flex flex-col items-center w-48">
            <p className="text-lg font-semibold dark:text-white">Desayuno</p>
            <p className="mt-2 text-sm break-words dark:text-white">
              Comienza el día con un delicioso desayuno preparado especialmente
              para ti.
            </p>
          </div>
        </div>
      </div>
      <AboutUs />
      <ReviewsCarrousel />
      <FooterComponent/>
    </div>
  );
};

export default Home;
