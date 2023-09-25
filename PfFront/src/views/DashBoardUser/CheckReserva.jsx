import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";

function CheckReserva() {
  const [reservation, setReservation] = useState(null);
  const [nroHabitacion, setNroHabitacion] = useState([]);
  const [review, setReview] = useState(false);
  const [qrValue, setQRValue] = useState("");
  const [check, setCheck] = useState("");
  //console.log(UsuarioId);

  const UsuarioId = useSelector((state) => state.auth.uid);
  //const URL = "https://hotel-oasis.onrender.com";

  const handleCheckIn = async () => {
    try {
      //Se limpia los estados
      setQRValue(null);
      setReservation(null);
      setReview(null);
      //console.log(UsuarioId);

      // Obtiene los detalles de la reserva
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/hotel/filtros/reservaPorUsuario/${UsuarioId}`
      );

      const data = response.data;
      //console.log(data)
      if (data.data) {
        const reservas = data.data[0];

        // Verifica si hay una reserva y si la fecha de ingreso está dentro de los próximos 30 días
        const fechaIngreso = reservas.fechaIngreso;

        if (isCheckInDateValid(fechaIngreso)) {
          setReservation(reservas);
          setCheck("Check-In");
          const habitaciones = reservas.Reserva_Items;
          const nroHabitaciones = habitaciones
            .map((elem) => elem.Habitacion.nroHabitacion)
            .join(", ");
          setNroHabitacion(nroHabitaciones);
          setQRValue(reservas.id);
        } else {
          alert("Mensaje: No se encontró una reserva válida para Check In.");
        }
      } else {
        return alert ("No hay Reservas")
      }
    } catch (error) {
      return alert("No tiene Reservas");
    }
  };

  const handleCheckOut = async () => {
    try {
      setQRValue(null);
      setReservation(null);
      setReview(null);

      // Obtiene los detalles de la reserva
         const response = await axios.get(
           `${
             import.meta.env.VITE_API_URL
           }/hotel/filtros/reservaPorUsuario/${UsuarioId}`
         );
      const data = response.data;

      if (data.data) {
        const reservas = data.data[0];

        // Verifica si hay una reserva y si la fecha de salida está dentro de los próximos 30 días
        const fechaSalida = reservas.fechaSalida;
        if (isCheckInDateValid(fechaSalida)) {
          setReservation(reservas);
          setCheck("Check-Out");
          setReview(true);
          const habitaciones = reservas.Reserva_Items;
          const nroHabitaciones = habitaciones
            .map((elem) => elem.Habitacion.nroHabitacion)
            .join(", ");
          setNroHabitacion(nroHabitaciones);
          setQRValue(reservas.id);
        } else {
          alert("No se encontró una reserva válida para Check Out.");
        }
      }
    } catch (error) {
      return alert("No tiene Reservas");
    }
  };

  // Función para verificar si la fecha de ingreso o salida están dentro de los próximos 30 días
  const isCheckInDateValid = (fecha) => {
    const fechaValida = new Date();
    fechaValida.setDate(fechaValida.getDate() + 30);

    return new Date(fecha) <= fechaValida;
  };

  return (
    <div className="bg-white rounded-3xl flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Gestión de Registro de Reservas del hotel
      </h1>
      <div className="flex">
        <button
          onClick={handleCheckIn}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg mr-2"
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2  rounded-lg mr-2"
        >
          Check Out
        </button>
      </div>

      {reservation && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Detalles del {check}</h2>
          <p>Número de Reserva: {reservation.id}</p>
          <p>Fecha de Ingreso: {reservation.fechaIngreso}</p>
          <p>Fecha de Salida: {reservation.fechaSalida}</p>
          <p>Adultos: {reservation.adultos}</p>
          <p>Niños: {reservation.ninos}</p>
          <p>Estado de Pago: {reservation.pago_Estado}</p>
          <p>Número de Habitación: {nroHabitacion}</p>
        </div>
      )}
      <div className="p-4">
        {qrValue && (
          <div>
            <h2 className="text-xl font-bold mb-2">Código QR de la Reserva</h2>
            <QRCode value={qrValue} />
          </div>
        )}
      </div>
      {review && (
        <div className="flex items-center justify-center flex-col">
          <p>
            Porque tu opinión importa y nos ayuda a mejorar, por favor déjamos
            una Reseña
          </p>
          <Link to="/reviewUser">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
              Dejar Reseña
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CheckReserva;
