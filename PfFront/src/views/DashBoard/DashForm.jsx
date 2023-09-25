import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, Text, Title, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, MultiSelect, MultiSelectItem, Select, SelectItem } from '@tremor/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
import { PutClientes } from '../../redux/actions';
import axios from 'axios';
 function Form(params) {
//const {id} = params
const {cambiarEstado, documento, setDoc, PutForm} = params
const dispatch = useDispatch()
    const [cliente, setCliente] = useState({nombre:"", apellidos:"", direccion:"", nroCelular:"", ciudad: "", pais:"", email:""})
    const handleChange = (e)=>{
   e.preventDefault();
   setCliente({...cliente, [e.target.name]: e.target.value})
    }
const handleSubmit = async(e)=>{
    e.preventDefault()
    PutForm(documento, cliente)
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
             <button onClick={handleClose} className='bg-red-300 hover:bg-red-400 text-gray-900 font-bold py-1 px-3 rounded'>X</button> 
               </div>
        
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Modificar informacion</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Modifique solo la informacion necesaria sobre el cliente seleccionado.
          </p>
        </div>
        <form action="#" method="PUT" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2.5">
                <input
                onChange={handleChange}
                  type="text"
                  name="nombre"
                  id="nombre"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="apellidos" className="block text-sm font-semibold leading-6 text-gray-900">
              Apellidos
              </label>
              <div className="mt-2.5">
                <input
                onChange={handleChange}
                  type="text"
                  name="apellidos"
                  id="apellidos"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="direccion" className="block text-sm font-semibold leading-6 text-gray-900">
                Direccion
              </label>
              <div className="mt-2.5">
                <input
                onChange={handleChange}
                  type="text"
                  name="direccion"
                  id="direccion"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="pais" className="block text-sm font-semibold leading-6 text-gray-900">
                Pais
              </label>
              <div className="mt-2.5">
                <input
                onChange={handleChange}
                  type="text"
                  name="pais"
                  id="pais"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="ciudad" className="block text-sm font-semibold leading-6 text-gray-900">
                Ciudad
              </label>
              <div className="mt-2.5">
                <input
                onChange={handleChange}
                  type="text"
                  name="ciudad"
                  id="ciudad"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="nroCelular" className="block text-sm font-semibold leading-6 text-gray-900">
                Numero de celular
              </label>
              <div className="relative mt-2.5">
                <input
                onChange={handleChange}
                  type="tel"
                  name="nroCelular"
                  id="nroCelular"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
export default Form