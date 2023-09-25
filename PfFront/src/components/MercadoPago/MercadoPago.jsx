import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { getLocalStorage } from "../../utilities/managerLocalStorage";
import { useSelector} from "react-redux";

const includedFeatures = [
  "Traslado al Aeropuerto",
  "Desayuno",
  "Piscina",
  "1 dia de spa",
];

const MercadoPago = ({
  nombre,
  apellido,
  dni,
  fechaIn,
  fechaOut,
  adultos,
  niños,
  dias,
}) => {
  const nameDb = useSelector((state) => state.auth.displayName);
  const idDb = useSelector((state) => state.auth.uid);
  const emailUser = useSelector((state) => state.auth.email);
  const [preferenceId, setPreferenceId] = useState(null);
  const [reserveId, setReserveId] = useState("")
  initMercadoPago("TEST-3aa1ff4a-f517-4dcf-8fb3-15640d67a3d3");
  let roomsLocal;
  if (getLocalStorage("rooms")) {
    roomsLocal = getLocalStorage("rooms");
  }
  console.log(roomsLocal);

  let total = 0;

  for (let i = 0; i < roomsLocal.length; i++) {
    total += roomsLocal[i].precio;
  }
  const arrayMapeado = roomsLocal.map((item) => ({
    title: "habitacion " + item.tipo_Habitacion,
    unit_price: item.precio,
    quantity: 1,
  }));
  let search;
  if (getLocalStorage("search")) {
    search = getLocalStorage("search");
  }
  const nombresHabitaciones = roomsLocal.map(
    (objeto) => objeto.tipo_Habitacion
  );
  const nameToString = nombresHabitaciones.join(", ");
  const totalPrice = roomsLocal.reduce(
    (total, objeto) => total + objeto.precio,
    0
  );
  console.log(totalPrice);

  const arrayHabitaciones = [];

  roomsLocal.forEach((objeto) => {
    const cantidadDeseada = objeto.quantity || 1;
    const habitacionesDisponibles = objeto.habitaciones.map((habitacion) => ({
      id: habitacion.id,
      numeroHabitacion: habitacion.nroHabitacion,
    }));

    // Asegurarse de no seleccionar números duplicados
    const numerosDisponiblesUnicos = [
      ...new Set(habitacionesDisponibles.map((h) => h.numeroHabitacion)),
    ];

    for (
      let i = 0;
      i < Math.min(cantidadDeseada, numerosDisponiblesUnicos.length);
      i++
    ) {
      const numeroHabitacion = numerosDisponiblesUnicos[i];
      const habitacionSeleccionada = habitacionesDisponibles.find(
        (h) => h.numeroHabitacion === numeroHabitacion
      );
      arrayHabitaciones.push({
        id: habitacionSeleccionada.id,
        numeroHabitacion,
      });
    }
  });
  const arrayData = roomsLocal.map((item) => {
    return { precio: item.precio, cantidad: item.quantity };
  });
  const numberRooms = arrayHabitaciones.map((item) => item.numeroHabitacion);
  const habitacionesId = arrayHabitaciones.map((item) => item.id);
  const numberToString = numberRooms.join(", ");
  const cantidadDeHabitaciones = numberRooms.length


  const objetosSeleccionados = [];

  roomsLocal.forEach((objeto) => {
    const cantidadDeseada = objeto.quantity;
    const habitacionesDisponibles = objeto.habitaciones;

    // Asegurémonos de que la cantidad deseada no sea mayor que la longitud del array de habitaciones
    const cantidadAExtraer = Math.min(
      cantidadDeseada,
      habitacionesDisponibles.length
    );

    // Extraer los primeros "cantidadAExtraer" objetos de habitaciones
    const habitacionesSeleccionadas = habitacionesDisponibles.slice(
      0,
      cantidadAExtraer
    );

    // Agregar los objetos seleccionados al array objetosSeleccionados
    objetosSeleccionados.push({
      precio: objeto.precio,
      quantity: cantidadDeseada,
      habitaciones: habitacionesSeleccionadas,
    });
  });

  // Ahora, objetosSeleccionados contiene los objetos seleccionados de cada objeto padre
  console.log(objetosSeleccionados);

  useEffect(() => {

    const fetchReserve = async ()=>{
      try {
        
        const reserveRequest = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/reservas`)
        const response = reserveRequest.data.data
        const filterData = response.filter((item)=>item.UsuarioId === idDb)
        console.log(filterData);
        const idReserve = filterData.map((item)=>{
          return item.id
        })
        const lengthOfArray = idReserve.length
        const element = idReserve[0]
        console.log(element);
        setReserveId(element)

      } catch (error) {
        
      }
    }
    fetchReserve()
  }, [])

console.log(reserveId);

  const createPreference = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/hotel/mercadoPago/create_preference`,
        {
          items: arrayMapeado,
          reservaId: reserveId,
        }
      );
      const initPoint = response.data.init_point;
      console.log(initPoint);
      return initPoint;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/hotel/email`, {
        email: `${emailUser}`,
        asunto: "Confirmación de Pago Exitoso en Oasis Hotel",
        nombre: nameDb,
        templateType: "reserva",
        fechaLlegada:`${search.fechaIn}`,
        fechaSalida:`${search.fechaOut}`,
        tipoHabitacion:[`${nameToString}`],
        numeroHabitacion:[`${numberToString}`],
        tarifaTotal:`${totalPrice}`

      });
    } catch (error) {
      console.log(error);
    }
    const apiUrl = `${import.meta.env.VITE_API_URL}/hotel/reservasItems`;

    objetosSeleccionados.forEach(async (objeto) => {
      const precio = objeto.precio;
      const cantidad = objeto.quantity; // Cambiado a objeto.quantity para obtener la cantidad correcta
      const reservaId = reserveId;

      // Recorre cada habitación en el objeto y realiza una solicitud POST por habitación
      for (const habitacion of objeto.habitaciones) {
        const habitacionId = habitacion.id;

        const data = {
          precio: precio,
          cantidad: cantidad,
          ReservaId: reservaId,
          HabitacionId: habitacionId, // Utiliza la ID de la habitación actual
        };

        try {
          // Realiza la solicitud POST a la API utilizando Axios dentro de un bloque try...catch
          await axios.post(apiUrl, data);
          console.log("Solicitud POST exitosa");
        } catch (error) {
          console.error("Error al realizar la solicitud POST", error);
        }
      }
    });
    let miArrayVacio = [];

    // Convierte el array en una cadena JSON
    let miArrayVacioJSON = JSON.stringify(miArrayVacio);

    // Almacena la cadena JSON en el localStorage con una clave específica
    localStorage.setItem("rooms", miArrayVacioJSON);
    const initPoint = await createPreference();
    if (initPoint) {
      setPreferenceId(initPoint);
      // Redireccionar al usuario al initPoint para completar el pago
      window.location.href = initPoint;
    }
  };






  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Mi Reserva
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Confirma los datos de tu reserva para proceder con el pago
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Titular de la reseva
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Nombre y apellido: {nombre} {apellido}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Dni/Pasaporte : {dni}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Fecha de ingreso: {fechaIn}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Fecha de egreso : {fechaOut}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                cantidad de adultos : {adultos}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                cantidad de niños : {niños}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Cantidad de habitaciones : {cantidadDeHabitaciones}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Tipo de habitaciones :{nameToString}
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  Tu reserva incluye
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">
                    Total a pagar
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      ${total}
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                      USD
                    </span>
                  </p>
                  <button
                    onClick={handleBuy}
                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Pagar
                  </button>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Icluye impuestos y demas persepciones dependiendo de tu pais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MercadoPago;
