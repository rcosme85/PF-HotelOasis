import React from "react";
import { useState, useEffect } from "react";
import PersonInput from "./Personinpurt";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validate } from "./validation";
import { getLocalStorage } from "../../utilities/managerLocalStorage";
import MercadoPago from "../MercadoPago/MercadoPago";
import { useSelector , useDispatch } from "react-redux";
import { login } from "../../redux/actions";

const Reservation = () => {
  const navigate = useNavigate();
  ///si no esta logueado se envia a la pagina de login
  const { status, photoURL } = useSelector((state) => state.auth);
  const loginAdmin = useSelector((state) => state.auth.admin);
  if (status !== "authenticated") {
    navigate('/login');
  }
  /// fin de validación logueo
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [reserve, setReserve] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [localStorageRoom, setLocalStorageRoom] = useState({
    fechaIn: "",
    fechaOut: "",
    adultos: 0,
    niños: 0,
  })
  const [showMercadoPago, setShowMercadoPago] = useState(false)
  const [showReserveForm, setshowReserveForm] = useState(true)
  const dataId = useSelector(state => state.auth.uid)

  
  const handleInputChange = (event, fieldName) => {
    const newValue = event.target.value;
    const formDataCopy = new FormData(event.target.form);
    formDataCopy.set(fieldName, newValue);

    const updatedInputs = Object.fromEntries(formDataCopy.entries());
    const updatedErrors = validate(updatedInputs);

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: updatedErrors[fieldName],
    }));
  };

  const handleAdultsChange = (value) => {
    setAdults(value);
  };

  const handleChildrenChange = (value) => {
    setChildren(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe
    const formData = new FormData(event.target);

    const newReserve = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      dni: formData.get("dni").toString(),
      type: formData.get("DniOrPassaport"),
      telephone: formData.get("telephone"),
      nacimiento: formData.get("nacimiento"),
      email: formData.get("email"),
      country: formData.get("country"),
      streetAddress: formData.get("street-address"),
      city: formData.get("city"),
      region: formData.get("region"),
      postalCode: formData.get("postal-code"),
      ingreso: formData.get("ingreso"),
      egreso: formData.get("egreso"),
      adults,
      children,
    };
    setReserve(newReserve);
  };
  console.log(dataId);
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
  useEffect(()=>{
    const searchDataFromLocalStorage = getLocalStorage('search');
    // Utiliza los datos como sea necesario en tu componente
    if(searchDataFromLocalStorage){
      setLocalStorageRoom(searchDataFromLocalStorage)
    }
  },[])

  useEffect(() => {
    const submitReserve = async () => {
      if (!dataId || !reserve.dni || reserve.dni===undefined) return; // No hacer solicitudes si dni está vacío
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/hotel/clientes/${reserve.dni}`);
        console.log("Cliente existente");
      } catch (error) {
        console.log("Cliente no encontrado. Creando cliente...");

        try {
          const createClientResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/hotel/clientes`,
            {
              email: reserve.email,
              nombre: reserve.firstName,
              apellidos: reserve.lastName,
              tipo_Documento: reserve.type,
              doc_Identidad: reserve.dni,
              fechaNacimiento: reserve.nacimiento,
              pais: reserve.country,
              ciudad: reserve.city,
              nroCelular: reserve.telephone,
              direccion: reserve.streetAddress,
            }
          );
          console.log("Cliente creado:", createClientResponse.data);
          
        } catch (error) {
          console.log("Error al crear el cliente:", error.response);
        }
      }

      try {
//ACA TENGO QUE HACER PARA QUE SE CREE EL USUARIO
        const userRequest = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/users`)
        const response = userRequest.data.data

        await axios.post(`${import.meta.env.VITE_API_URL}/hotel/reservas`, {
          fechaIngreso: reserve.ingreso,
          fechaSalida: reserve.egreso,
          adultos: localStorageRoom.adultos,
          ninos: localStorageRoom.niños,
          pago_Estado: "Pending",
          UsuarioId: dataId,
          ClienteDocIdentidad: reserve.dni,
        });
        console.log("Reserva creada");
        setshowReserveForm(false)
        setShowMercadoPago(true)
      } catch (error) {
        console.log("Error al crear la reserva:", error);
      }
    };

    submitReserve();
  }, [reserve]);

  const toBackReserve = ()=>{
    setshowReserveForm(true)
    setShowMercadoPago(false)
  }
  return (
    <>
    <div className="w-11/12 md:w-6/12 mx-auto">
      {showReserveForm && (
        <div className="border-b border-gray-900/10 p-10 pb-12 mt-10">
        <h2 className="text-4xl   font-semibold leading-7 text-gray-900">
          Informacion del Titular de la reserva
        </h2>
        <p className="mt-1 text-2xl  leading-6 text-gray-600">
          Usar la informacion de la persona que vaya a hacer el Check - In y el
          Check-out
        </p>
  
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        >
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nombre
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                onChange={(event) => handleInputChange(event, "first-name")}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {formErrors["first-name"] && (
              <p className="text-red-500">{formErrors["first-name"]}</p>
            )}
          </div>
  
          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Apellido
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                onChange={(event) => handleInputChange(event, "last-name")}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {formErrors["last-name"] && (
              <p className="text-red-500">{formErrors["last-name"]}</p>
            )}
          </div>
          
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              DNI/PASAPORTE
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="dni"
                id="dni"
                onChange={(event) => handleInputChange(event, "dni")}
                autoComplete="dni"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {formErrors["dni"] && (
              <p className="text-red-500">{formErrors["dni"]}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Selecciona tu tipo de documento
            </label>
            <div className="mt-2">
              <select
                id="DniOrPassaport"
                name="DniOrPassaport"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>DNI</option>
                <option>Pasaporte</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Número de telefono
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="telephone"
                id="telephone"
                onChange={(event) => handleInputChange(event, "telephone")}
                autoComplete="telephone"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {formErrors["telephone"] && (
              <p className="text-red-500">{formErrors["telephone"]}</p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(event) => handleInputChange(event, "email")}
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            
            {formErrors["email"] && (
              <p className="text-red-500">{formErrors["email"]}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Fecha de nacimiento
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="nacimiento"
                id="nacimiento"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {formErrors["nacimiento"] && (
              <p className="text-red-500">{formErrors["nacimiento"]}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pais
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Argentina</option>
                <option>Colombia</option>
                <option>Peru</option>
                <option>United State</option>
                <option>Canada</option>
                <option>España</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Direccion
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Ciudad
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Provincia / Estado
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Codigo Postal / ZIP
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="hidden sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Fecha de ingreso
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="ingreso"
                id="ingreso"
                defaultValue={localStorageRoom.fechaIn}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="hidden sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Fecha de egreso
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="egreso"
                id="egreso"
                defaultValue={localStorageRoom.fechaOut}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
              />
            </div>
          </div>

          <div className="hidden">
            <h1 className="text-2xl font-semibold mb-4">Agrega personas</h1>
            <div className="flex gap-4">
              <PersonInput label="Adultos" onChange={handleAdultsChange} value={localStorageRoom.adultos} />
              <PersonInput label="Niños" onChange={handleChildrenChange} value={localStorageRoom.niños} />
            </div>
          </div>


          <div className=" sm:col-span-6 mt-2" style={{ margin: "auto" }}>
            <button
              className=" mx-auto rounded-lg w-60 bg-[#152430] text-white py-2 px-4  "
              type="submit"
            >
              Reservar
            </button>
          </div>

        </form>
      </div>
      )}
    </div>
    
    <div>
  {showMercadoPago && (
    <div>
      <MercadoPago
        nombre={reserve.firstName}
        apellido={reserve.lastName}
        dni={reserve.dni}
        fechaIn={reserve.ingreso}
        fechaOut={reserve.egreso}
        adultos={localStorageRoom.adultos}
        niños={localStorageRoom.niños}
        dias={diasEntreFechas(reserve.ingreso , reserve.egreso)}
      />
    </div>
  )}
</div>
    </>
  );
};

export default Reservation;