import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  saveLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "../../utilities/managerLocalStorage";
import { searchRooms,savePage } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (inputs) => {
    let today = new Date();
    let totalError = 0;
    let err = {};

  if (!inputs.fechaIn || inputs.fechaIn.length < 10) {
    err.fechaIn = "Falta la Fecha de Ingreso";
    totalError++
  }
  if (!inputs.fechaOut || inputs.fechaOut.length < 10) {
    err.fechaOut = "Falta la Fecha de Salida";
    totalError++
  }
  if (inputs.fechaIn < today) {
    err.fechaIn = "Fecha de Ingreso incorrecta";
    totalError++
  }
  if (inputs.fechaIn >= inputs.fechaOut) {
    err.fechaOut = "Fecha de Salida incorrecta";
    totalError++
  }
  if (inputs.adultos < 1) {
    err.adultos = "Falta el número de adultos";
    totalError++
  }
  
// console.log('Errores::',err)
setErrors(err)
  return totalError;
};

  let search = { fechaIn: "", fechaOut: "", adultos: 1, niños: 0, bebes: 0 };

  const [inputs, setInputs] = useState(search);
  //console.log('IN',inputs)
  const [errors, setErrors] = useState({
    fechaIn: "",
    fechaOut: "",
    adultos: "",
    niños: "",
  });

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isCheckInCalendarOpen, setIsCheckInCalendarOpen] = useState(false);
  const [isCheckOutCalendarOpen, setIsCheckOutCalendarOpen] = useState(false);

  useEffect(() => {
    const searchFromLocalStorage = getLocalStorage("search");
  
    if (searchFromLocalStorage) {
      const searchStart = searchFromLocalStorage.fechaIn;
      const currentDate = new Date().toISOString().slice(0, 10);
  
      if (searchStart > currentDate) {
        // La fecha del almacenamiento local es igual o mayor que la fecha actual
        setInputs(searchFromLocalStorage);
        validate(searchFromLocalStorage);
        dispatch(searchRooms(searchFromLocalStorage));
      }
    }
  }, [pathname]);

  //console.log('Form',diets)

  const handleChange = (event) => {
    let campo = event.target.name;
    let valor = event.target.value;
    //console.log('change',campo,valor)
    setInputs({ ...inputs, [campo]: valor });
    validate({ ...inputs, [campo]: valor });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    let total = validate(inputs);
    if (total !== 0) return;

    saveLocalStorage("search", inputs);
    dispatch(searchRooms(inputs));
    dispatch(savePage(1))
    if (pathname !== "/search") {
      navigate("/search");
    }
  };

  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  return (
    <div className="mx-auto -mt-4">
      <form onSubmit={handleSubmit}>
        <div className="search-form bg-Secondary p-2 rounded-md shadow-md text-center md:text-left flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 lg:gap-8 md:items-end md:justify-between  align-bottom md:p-4 dark:bg-[#84550f]">
          <div className="flex flex-col">
            <label className="dark:text-white">Fecha de Ingreso:</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => {
                setCheckInDate(date);
                setInputs({ ...inputs, fechaIn: formatDate(date) });
              }}
              onClickOutside={() => setIsCheckInCalendarOpen(false)}
              onFocus={() => setIsCheckInCalendarOpen(true)}
              open={isCheckInCalendarOpen}
              dateFormat="dd-MM-yyyy"
              minDate={new Date()}
              className="border rounded-md"
              placeholderText="Ingreso"
              value={inputs.fechaIn}
              name="fechaIn"
            />
          </div>
          <div className="flex flex-col">
            <label className="dark:text-white">Fecha de Salida:</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => {
                setCheckOutDate(date);
                setInputs({ ...inputs, fechaOut: formatDate(date) });
              }}
              onClickOutside={() => setIsCheckOutCalendarOpen(false)}
              onFocus={() => setIsCheckOutCalendarOpen(true)}
              open={isCheckOutCalendarOpen}
              dateFormat="dd-MM-yyyy"
              minDate={checkInDate ? new Date(checkInDate) : new Date()}
              className="border rounded-md"
              placeholderText="Salida"
              value={inputs.fechaOut}
              name="fechaOut"
            />
          </div>
          <div className="flex flex-col">
            <label className="dark:text-white">Adultos</label>
            <input
              type="number"
              min="1"
              value={inputs.adultos}
              name="adultos"
              className="border rounded-md w-14 text-center"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="dark:text-white">Niños</label>
            <input
              type="number"
              min="0"
              value={inputs.niños}
              name="niños"
              className="border rounded-md w-14 text-center"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-customOrange text-white px-10 py-2"
            >
              Buscar
            </button>
          </div>
        </div>
        {errors.fechaIn && (
          <div className="text-sm text-red-800">{errors.fechaIn}</div>
        )}
        {errors.fechaOut && (
          <div className="text-sm text-red-800">{errors.fechaOut}</div>
        )}
        {errors.adultos && (
          <div className="text-sm text-red-800">{errors.adultos}</div>
        )}
      </form>
    </div>
  );
}
