import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {IconSquareRoundedXFilled} from '@tabler/icons-react'

const PaymenView = ({ close, id, tipo_Habitacion, subTipo, descripcion, capacidad, image, caracteristica }) => {
  const [roomData, setRoomData] = useState({});


  return (
    <div id={id} className="bg-white mx-auto max-w-sm border border-gray-300 rounded-lg overflow-hidden">
      <div className="text-right pr-2">
      <button className="border-red right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8" onClick={close}><IconSquareRoundedXFilled /></button>  
      </div>
      
      <img src={image} alt={`Imagen de ${tipo_Habitacion}`} />

      <div className="flex flex-col items-center p-6">
        <div className="flex items-baseline">
          <span className="bg-teal-500 text-white rounded-full px-2">
            {subTipo}
          </span>
          <span className="text-gray-500 font-semibold tracking-wide text-xs uppercase ml-2">
            {capacidad} cama &bull; {roomData.capacidad} {capacidad} baño
          </span>
        </div>

        <h4 className="mt-1 font-semibold leading-tight">
          {tipo_Habitacion}
        </h4>

        <div className="mt-1">
          {descripcion}
          <span className="text-gray-600 text-sm">
            {/* Esto parece ser información adicional */}
            
          </span>
        </div>

        <div className="flex  mt-2 items-center">
          
          {/* {Array(5)
            .fill('')
            .map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 fill-current ${
                  i < roomData.rating ? 'text-teal-500' : 'text-gray-300'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 1l2.39 5.44h5.61l-4.33 3.98 1.3 5.4L10 13.36l-5.97 4.46 1.3-5.4L2 6.44h5.61L10 1z" />
              </svg>
            ))} */}
          <span className="ml-2 text-gray-600 text-sm">
            {/* Esto también parece ser información adicional */}
{caracteristica}
          </span>
        </div>

        {/* Agregar el botón de pago */}
        {/* <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600">
          Pagar
        </button> */}

      </div>
    </div>
  );
};

export default PaymenView;