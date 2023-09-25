import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import ModalReserve from "./ModalReserve";
const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];

const Reserve = ({info}) => {
  const idDb = useSelector((state) => state.auth.uid);
  const [state, setState] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleMoreInfoClick = (cardInfo) => {
    setSelectedCard(cardInfo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const reserveRequest = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel/reservas`
        );
        const response = reserveRequest.data.data;
        const filterData = response.filter((item) => item.UsuarioId === idDb);
        // console.log(filterData);
        const dataCliente = filterData.map((item) => {
          return {
            id:item.id,
            nombre: item.Cliente.nombre,
            apellido: item.Cliente.apellidos,
            email: item.Cliente.email,
            image: "/logo.jpg",
            ingreso:item.fechaIngreso,
            egreso:item.fechaSalida,
            adultos:item.adultos,
            ninos:item.ninos,
            estado_Pago:item.pago_Estado
          };
        });
        setState(dataCliente);
      } catch (error) {}
    };
    fetchData();
  }, []);

  // console.log(state);


  return (
    <>
    <div className="relative">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl dark:text-white">Mis Reservas</h1>
        </div>
        <ul role="list" className="bg-white rounded-3xl divide-y divide-gray-100">
          {state.map((person) => (
            <li
              key={person.id}
              className="w-full flex flex-col items-center md:flex-row justify-between gap-2 sm:gap-4 py-4 md:py-6 lg:py-8 relative"
            >
              <div className="flex flex-col md:flex-row items-center min-w-0 gap-2 md:gap-4">
                <img
                  className="h-12 w-12 md:h-16 md:w-16 flex-none rounded-full bg-gray-50"
                  src={person.image}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold md:text-base lg:text-lg leading-6 text-gray-900">{`${person.nombre}  ${person.apellido}`}</p>
                  <p className="mt-1 text-xs md:text-sm lg:text-base leading-5 text-gray-500">
                    {person.email}
                  </p>
                  <p className="mt-1 text-xs md:text-sm lg:text-base leading-5 text-gray-500">
                    ingreso: {person.ingreso}
                  </p>
                </div>
              </div>
              <div className=" top-0 right-0 mt-2 md:mt-0">
                <button onClick={() => handleMoreInfoClick(person)}>
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
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {modalOpen && (
        <div
          className="fixed mb-10 backdrop-blur-sm bg-black/70 inset-0 flex items-center justify-center z-50"
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <ModalReserve
              isOpen={modalOpen}
              onClose={handleCloseModal}
              cardInfo={selectedCard}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Reserve;
