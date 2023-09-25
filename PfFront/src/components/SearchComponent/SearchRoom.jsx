import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderRoom, savePage, filterRoom } from "../../redux/actions";
import { getLocalStorage } from "../../utilities/managerLocalStorage";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import styles from "./SearchRoom.module.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconChevronsRight, IconChevronsLeft } from "@tabler/icons-react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Room from "../Room/Room";
import PaymenView from "../Payment/PaymenView";
import SearchBox from "../SearchBox/SearchBox";
import CartRooms from "../CartRooms/CartRooms";

const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function diasEntreFechas(fecha1, fecha2) {
  // Convierte las fechas de texto a objetos Date
  const date1 = new Date(fecha1);
  const date2 = new Date(fecha2);

  // Calcula la diferencia en milisegundos
  const diferenciaEnMilisegundos = Math.abs(date2 - date1);

  // Convierte la diferencia a días
  const diasDiferencia = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

  return diasDiferencia;
}

const SearchRoom = () => {
  const dispatch = useDispatch();

  const [cartShow, setCartShow] = useState(false);
  const [roomReserve, setRoomReserve] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quantityTotal, setQuantityTotal] = useState(1);

  const sortOptions = [
    "Jacuzzi",
    "Sala de estar",
    "Cocina privada",
    "Suite",
    "Sala de reunión",
  ];
  const [filtros, setFiltros] = useState([]);
  // Función para manejar la selección/deselección de una opción
  const handleFiltros = (opcion) => {
    //alert(opcion)
    let newFiltros = [];
    if (filtros.includes(opcion)) {
      // Si la opción ya está seleccionada, la eliminamos
      newFiltros = filtros.filter((item) => item !== opcion);
      setFiltros(newFiltros);
      dispatch(filterRoom(newFiltros));
    } else {
      // Si la opción no está seleccionada, la agregamos
      newFiltros = [...filtros, opcion];
      setFiltros(newFiltros);
      dispatch(filterRoom(newFiltros));
    }
    paginator(1);
  };
  //console.log('filtros:',filtros)

  const [order, setOrder] = useState("Capacidad");
  const handleOrder = (type) => {
    dispatch(orderRoom(type));
    setOrder(type);
  };

  const roomsRedux = useSelector((state) => state.rooms);
  const allRoomsRedux = useSelector((state) => state.allRooms);
  //Rooms LocalStorage :
  //añadir habitacion

  const addToCart = (item) => {
    setSelectedRoom(item);
  };

  const showCart = () => {
    setCartShow(true);
  };

  const closeCart = () => {
    setCartShow(false);
  };

  ///datos del SearchBox:
  let search;
  if (getLocalStorage("search")) {
    search = getLocalStorage("search");
  }
  //

  let roomsLocal = [];
  if (getLocalStorage("rooms")) {
    roomsLocal = getLocalStorage("rooms");
  }
  //---------MANEJO DE CARRITO-------------//
  const isProductInCart = (productId) => {
    return roomsLocal.some((item) => item.id === productId);
  };

  const addReserve = (item) => {
    if (!isProductInCart(item.id)) {
      // Si el producto no está en el carrito, agrégalo
      const newItem = {
        ...item,
        precio: item.precio * diasEntreFechas(search.fechaIn, search.fechaOut),
        quantity: 1,
      };
      setRoomReserve([...roomReserve, newItem]);
      localStorage.setItem("rooms", JSON.stringify([...roomReserve, newItem]));
    } else {
      increaseQuantity(item.id);
      // Producto ya en el carrito, puedes mostrar un mensaje de error o realizar otra acción.
    }
    showCart();
  };

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("rooms")) || [];
    setRoomReserve(storedRooms);
  }, []);

  const removeRoom = (roomId) => {
    // Filtra las habitaciones en el carrito y elimina la que coincida con el ID
    const updatedRoomReserve = roomReserve.filter((room) => room.id !== roomId);
    // Actualiza el estado del carrito
    setRoomReserve(updatedRoomReserve);
    // Actualiza el almacenamiento local
    localStorage.setItem("rooms", JSON.stringify(updatedRoomReserve));
  };

  const increaseQuantity = (itemId) => {
    const updatedReserve = roomReserve.map((item) => {
      if (item.id === itemId && item.quantity < 5) {
        // Si el ID del elemento coincide y la cantidad es menor que 5, incrementa la cantidad y actualiza el precio.
        const newQuantity = item.quantity + 1;
        const newPrice = item.precio + item.precio / item.quantity; // Incrementa el precio original dividido por la cantidad original.
        return { ...item, precio: newPrice, quantity: newQuantity };
      }
      return item;
    });

    setRoomReserve(updatedReserve);
    localStorage.setItem("rooms", JSON.stringify(updatedReserve));
  };

  const decreaseQuantity = (itemId) => {
    const updatedReserve = roomReserve.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        // Si el ID del elemento coincide y la cantidad es mayor que 1, decrementa la cantidad y actualiza el precio.
        const newQuantity = item.quantity - 1;
        const newPrice = item.precio - item.precio / item.quantity; // Resta el precio original dividido por la cantidad original.
        return { ...item, precio: newPrice, quantity: newQuantity };
      }
      return item;
    });

    setRoomReserve(updatedReserve);
    localStorage.setItem("rooms", JSON.stringify(updatedReserve));
  };

  // console.log(roomsLocal);
  //---------PARA QUE NO SE AGREGUE UNA CARD REPETIDO-------------//

  ///Paginado - Filtros - Orden
  const roomsPerPage = 4;
  let totalPages = 1;
  //
  let nowPage = useSelector((store) => store.page);
  const [roomsPage, setRoomsPage] = useState([]); //listado-paginado
  const [actualPage, setActualPage] = useState(1);
  //
  const [filter, setFilter] = useState("");
  const [filterOrder, setFilterOrder] = useState("");
  //
  let [btnPaginator, setBtnPaginator] = useState([]); ///botones paginado

  function paginator(pag) {
    setActualPage(pag);
    const init = (pag - 1) * roomsPerPage;
    const end = init + roomsPerPage;
    setRoomsPage(roomsRedux?.slice(init, end));

    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hace que el desplazamiento sea suave
    });
    dispatch(savePage(pag));
  }

  useEffect(() => {
    paginator(nowPage);

    if (roomsRedux?.length >= 0) {
      totalPages = Math.ceil(roomsRedux.length / roomsPerPage);
      // Genera un arreglo con la cantidad de botones que necesitas
      let new_btnPaginator = Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
      setBtnPaginator(new_btnPaginator);
      paginator(nowPage);
      //console.log("qq", nowPage);
    }
  }, [roomsRedux]);

  return (
    <>
      <div className="bg-white dark:bg-[#16242f]">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl " >
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        Filtros
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200   z-10">
                      <h3 className="sr-only">Categories</h3>
                      <ul
                        role="list"
                        className="px-2 py-3 font-medium text-gray-900"
                      >
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex mt-10 md:mt-20">
              <SearchBox />
            </div>
            <div className="flex gap-10 flex-col md:flex-row items-center md:items-baseline justify-between border-b border-gray-200 pb-6 pt-8 md:pt-24 ">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Habitaciones
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="dark:text-white group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Filtros
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    
                  >
                    <Menu.Items className="absolute -right-14 md:right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="p-2">
                        <ul>
                          {sortOptions.map((opcion, index) => (
                            <li key={index}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={filtros.includes(opcion)}
                                  onChange={() => handleFiltros(opcion)}
                                  className="mr-2"
                                />
                                {opcion}
                              </label>
                            </li>
                          ))}
                        </ul>

                        <ul className="border-t border-t-gray-200">
                          Orden:
                          <li>
                            <label>
                              <input
                                type="radio"
                                onChange={() => handleOrder("Precio Menor")}
                                className="mr-2"
                                name="orden"
                                checked={order === "Precio Menor"}
                              />
                              Precio Menor
                            </label>
                          </li>
                          <li>
                            <label>
                              <input
                                type="radio"
                                onChange={() => handleOrder("Precio Mayor")}
                                className="mr-2"
                                name="orden"
                                checked={order === "Precio Mayor"}
                              />
                              Precio Mayor
                            </label>
                          </li>
                          <li>
                            <label>
                              <input
                                type="radio"
                                onChange={() => handleOrder("Capacidad")}
                                className="mr-2"
                                name="orden"
                                checked={order === "Capacidad"}
                              />
                              Capacidad
                            </label>
                          </li>
                        </ul>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button className="ml-10" onClick={showCart}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-black dark:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>

                {/* <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button> */}


                {/* <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button> */}
                
              </div>
            </div>

            {/* paginado */}
            <div className="flex space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0 mt-4">
                {actualPage > 1 ? (
                  <button
                    onClick={() => paginator(actualPage - 1)}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-gray-600 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                ) : (
                  btnPaginator?.length > 1 && (
                    <button className="text-gray-400 dark:text-gray-600 relative inline-flex items-center rounded-l-md px-2 py-2 focus:z-20 focus:outline-offset-0">
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )
                )}

                {btnPaginator?.length > 1 &&
                  btnPaginator?.map((numeroPag, i) => (
                    <a
                      className={`${
                        actualPage === numeroPag
                          ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white dark:bg-gray-700 dark:text-white dark:focus:outline-offset-0 dark:focus-visible:outline dark:focus-visible:outline-2 dark:focus-visible:outline-offset-2 dark:focus-visible:outline-indigo-600"
                          : "dark:text-white relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:hover:bg-gray-800 dark:focus:z-20 dark:focus:outline-offset-0"
                      }`}
                      key={i}
                      onClick={() => paginator(numeroPag)}
                      href="#"
                    >
                      {`${numeroPag}`}
                    </a>
                  ))}

                {actualPage < btnPaginator.length ? (
                  <button
                    onClick={() => paginator(actualPage + 1)}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-gray-600 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                ) : (
                  btnPaginator?.length > 1 && (
                    <button className="text-gray-400 dark:text-gray-600 relative inline-flex items-center rounded-r-md px-2 py-2 focus:z-20 focus:outline-offset-0">
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  )
                )}
              </div>
            {/* Fin paginado */}

            <section aria-labelledby="products-heading" className="pb-24 pt-6 ">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              {/* Filters */}
              <div>
                {cartShow && (
                  <div>
                    <CartRooms
                      state={cartShow}
                      close={closeCart}
                      arrayRooms={roomsLocal}
                      remove={removeRoom}
                      dias={diasEntreFechas(search.fechaIn, search.fechaOut)}
                      quantityTotal={quantityTotal}
                      increseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                    />
                  </div>
                )}

                {/* Product grid */}
                <div className="flex flex-col gap-10 lg:col-span-3">
                  {/* Your content roomsRedux*/}
                  {roomsPage?.length > 0 &&
                    roomsPage.map((item) => (
                      <div key={item.id}>
                        <Room
                          handleClick={() => addToCart(item)}
                          id={item.id}
                          tipo_Habitacion={item.tipo_Habitacion}
                          subTipo={item.subTipo}
                          precio={item.precio}
                          image={item.image}
                          capacidad={item.capacidad}
                          dias={diasEntreFechas(
                            search.fechaIn,
                            search.fechaOut
                          )}
                          fechaIn={search.fechaIn}
                          FechaOut={search.fechaOut}
                          handleClickReserve={() => addReserve(item)}
                        />
                      </div>
                    ))}
                  {roomsPage?.length == 0 && <div>Sin Resultados</div>}

                  {selectedRoom && (
                    <div className="z-50 backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto">
                      <PaymenView
                        close={() => setSelectedRoom(null)} // Cierra el componente PaymenView
                        id={selectedRoom.id}
                        tipo_Habitacion={selectedRoom.tipo_Habitacion}
                        subTipo={selectedRoom.subTipo}
                        descripcion={selectedRoom.descripcion} // Asegúrate de pasar los detalles correctos
                        capacidad={selectedRoom.capacidad}
                        image={selectedRoom.image}
                        caracteristica={selectedRoom.caracteristica}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* paginado */}
              <div className="flex space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0 mt-4 ">
                {actualPage > 1 ? (
                  <button
                    onClick={() => paginator(actualPage - 1)}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-gray-600 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                ) : (
                  btnPaginator?.length > 1 && (
                    <button className="text-gray-400 dark:text-gray-600 relative inline-flex items-center rounded-l-md px-2 py-2 focus:z-20 focus:outline-offset-0">
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )
                )}

                {btnPaginator?.length > 1 &&
                  btnPaginator?.map((numeroPag, i) => (
                    <a
                      className={`${
                        actualPage === numeroPag
                          ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white dark:bg-gray-700 dark:text-white dark:focus:outline-offset-0 dark:focus-visible:outline dark:focus-visible:outline-2 dark:focus-visible:outline-offset-2 dark:focus-visible:outline-indigo-600"
                          : "dark:text-white relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:hover:bg-gray-800 dark:focus:z-20 dark:focus:outline-offset-0"
                      }`}
                      key={i}
                      onClick={() => paginator(numeroPag)}
                      href="#"
                    >
                      {`${numeroPag}`}
                    </a>
                  ))}

                {actualPage < btnPaginator.length ? (
                  <button
                    onClick={() => paginator(actualPage + 1)}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-gray-600 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                ) : (
                  btnPaginator?.length > 1 && (
                    <button className="text-gray-400 dark:text-gray-600 relative inline-flex items-center rounded-r-md px-2 py-2 focus:z-20 focus:outline-offset-0">
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  )
                )}
              </div>

              {/* Fin paginado */}
            </section>
          </main>
        </div>
      </div>
    </>
  );
};
export default SearchRoom;
