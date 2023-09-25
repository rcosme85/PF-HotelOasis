import React from 'react'

const DashboardComponent = ({reserve,check,datos,reviews}) => {
  return (
    <div>
    <div className="grid grid-cols-2 gap-8 p-4">
      <div onClick={reserve} className="w-60 h-60 rounded-3xl bg-[#16242f] dark:bg-white flex items-center justify-center hitem item--1">

        <span className=" text-white dark:text-black text-2xl text--1"> Mis Reservas </span>

      </div>
      <div onClick={check}  className="w-60 h-60 rounded-3xl bg-[#16242f]  dark:bg-white flex items-center justify-center item item--2">

        <span className=" text-white dark:text-black text-xl text--1"> Hacer Check-in/Check-out </span>

      </div>
      <div onClick={reviews} className="w-60 h-60 rounded-3xl dark:bg-white bg-[#16242f] flex items-center justify-center item item--3">

        <span className="text-white text-2xl dark:text-black text text--3"> Mis reseñas </span>
      </div>
      <div onClick={datos} className="w-60 h-60 rounded-3xl dark:bg-white bg-[#16242f] flex items-center justify-center item item--4">

        <span  className="text-white text-2xl dark:text-black text text--4"> Modificar mis Datos </span>
      </div>
    </div>
    </div>
  )
}

export default DashboardComponent