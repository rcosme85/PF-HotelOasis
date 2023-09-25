import React from "react";

function Room({handleClick, id ,tipo_Habitacion,subTipo,precio,image,capacidad,dias,fechaIn,FechaOut,handleClickReserve}) {

  return (
    <div
    id={id}
    className="bg-[#152430] dark:bg-white border-gray-100 flex flex-col sm:flex-row border rounded-lg mx-auto w-full h-auto sm:h-80 sm:ml-10 self-stretch shadow-xl"
  >
    <div className="sm:max-w-sm border border-gray-300 rounded-lg overflow-hidden">
      <img className="h-full w-full " src={image} alt="" />
    </div>
    <div className="w-full sm:w-2/3 p-4 flex flex-col items-center justify-between">
      <div className="text-xl text-white  sm:text-3xl font-bold mb-2 sm:mb-4 dark:text-black">{tipo_Habitacion}</div>
      <div className="font-mono text-base text-white sm:text-lg mb-4 dark:text-black">{subTipo}</div>
      <div className="flex flex-col items-center text-base sm:text-lg mb-4 ">
        <span className="font-mono text-white dark:text-black mr-1">{fechaIn} hasta {FechaOut}</span>
        
        {/* <span className="sm:ml-1">Adultos {Adultos} - Niños {Niños}</span> */}
<span className="text-white font-mono sm:ml-1 dark:text-black">Para {capacidad} {capacidad === 1 ? "persona" : "personas"}</span>

      </div>
      <div className="text-xl sm:text-3xl font-bold flex items-center justify-center mb-4">
        <span className="text-white mr-1 dark:text-black">${precio*dias} USD</span>
      </div>
      <div className="flex gap-10 justify-center">
        <button
          onClick={handleClick}
          className="bg-white dark:bg-black dark:text-white w-28 h-10 text-black rounded-lg px-4 py-2 hover:bg-yellow-800"
        >
          +Info
        </button>
        <button onClick={handleClickReserve} className="bg-white  dark:bg-black dark:text-white w-28 h-10 text-black rounded-lg px-4 py-2 hover:bg-yellow-800">
          Seleccionar
        </button>
      </div>
    </div>
  </div>
  );
}

export default Room;
