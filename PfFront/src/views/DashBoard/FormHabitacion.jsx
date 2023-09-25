
import React, { useState, useEffect } from 'react';
import { Select, SelectItem } from "@tremor/react";
import { useDispatch } from 'react-redux';
import { detailRoom } from '../../redux/actions';
import axios from 'axios';
 function FormHabitacion(params) {
//const {id} = params


const {cambiarEstado, id, setDoc, admin} = params
const [habDetalle, setHabDetalle] = useState({})
const dispatch = useDispatch()
useEffect(() => {
  const fetchData = async () => {
    const hab = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle/${id}`)
   await setHabDetalle(hab.data.data)
  };
  fetchData();
}, []);
const {precio, tipo_Habitacion, subTipo, descripcion, capacidad, caracteristica, image} = habDetalle
console.log( precio)
    const [habitacion, setHabitacion] = useState({precio: precio, tipo_Habitacion: tipo_Habitacion,  subTipo:subTipo, descripcion:descripcion,
      caracteristica: caracteristica, capacidad:capacidad, image: image })
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setHabitacion({ ...habitacion, [name]: value });
      };
     // console.log(habitacion)
     console.log(habDetalle)
const handleSubmit = async(e)=>{
    e.preventDefault()
     
    await axios.put(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle/put/${id}`, habitacion)
    cambiarEstado(false)
  }
const handleClose = ()=>{
    cambiarEstado(false)
}

//aplicar a todos los input el handleChange
//
    return(
        
        <div className=" isolate bg-white px-6 py-24 sm:py-10 lg:px-8 rounded">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem] "
          aria-hidden="true"
        >
            
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
            <div className='flex items-center justify-between'> 
             <button onClick={handleClose} className='bg-red-300 hover:bg-red-400 text-gray-950 font-bold py-1 px-3 rounded'>X</button> 
               </div>
        
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Modificar informacion</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Modifique solo la informacion necesaria.
          </p>
        </div>
        <form action="#" method="PUT" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2" >   
        <div>
          <label htmlFor="precio" className="block text-sm font-semibold leading-6 text-gray-900">
            Precio
          </label>
          <div className="mt-2.5">
            <input
              onChange={handleChange}
              type="number"
              name="precio"
              id="precio"
             
              className="block text-lg w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="">
        <label htmlFor="tipo_Habitacion" className="block text-sm font-semibold leading-6 text-gray-900">
  Tipo de Habitación
</label>
<div className="mt-2.5">
  <select
    onChange={handleChange}
    name="tipo_Habitacion"
   
    className="block text-lg w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  >
    <option value="Individual">Individual</option>
    <option value="Doble">Doble</option>
    <option value="Familiar">Familiar</option>
    <option value="Matrimonial">Matrimonial</option>
    <option value="Ejecutiva">Ejecutiva</option>
    <option value="VIP">VIP</option>
  </select>
</div>
        </div>
        <div>
          <label htmlFor="subTipo" className="block text-sm font-semibold leading-6 text-gray-900">
            Subtipo
          </label>
          <div className="mt-2.5">
  <select
    onChange={handleChange}
    name="subTipo"
   
    className="block text-lg w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  >
    <option value="Economica">Economica</option>
    <option value="Confort">Confort</option>
    <option value="Gold">Gold</option>
  </select>
</div>
        </div>
        <div>
          <label htmlFor="capacidad" className="block text-sm font-semibold leading-6 text-gray-900">
            Capacidad
          </label>
          <div className="mt-2.5">
            <input
              onChange={handleChange}
              type="number"
              name="capacidad"
              id="capacidad"
              
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="descripcion" className="block text-sm font-semibold leading-6 text-gray-900">
            Descripción
          </label>
          <div className="mt-2.5">
          <textarea
           onChange={handleChange}
            name="descripcion"
          id="descripcion"
          className="block w-full h-20 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         ></textarea>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="caracteristica" className="block text-sm font-semibold leading-6 text-gray-900">
            Característica
          </label>
          <div className="mt-2.5">
            <input
              onChange={handleChange}
              type="text"
              name="caracteristica"
              id="caracteristica"
              
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
       
        <div className="sm:col-span-2">
          <label htmlFor="image" className="block text-sm font-semibold leading-6 text-gray-900">
            Imagen
          </label>
          <div className="mt-2.5">
            <input
              onChange={handleChange}
              type="text"
              name="image"
              id="image"
             
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        </div>
        <div className="mt-10">
          <button
            onClick={handleSubmit}
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Modificar
          </button>
        </div>
      </form>
      </div>   
       
    )


}
export default FormHabitacion