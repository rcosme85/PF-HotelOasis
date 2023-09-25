import { useState } from "react"
import Reservation from "../ReservationForm/Reservation"
import LoginPage from "../../views/Auth/Pages/LoginPage"
import RegisterPage from "../../views/Auth/Pages/RegisterPage"

export default function StepsBooking({setShowBookingSteps}){

 const [paso, setPaso] = useState(1)
 
 return (
  <>
  <div className="fixed inset-0 bg-black bg-opacity-50 flex align-middle items-center">
  
  <div className="w-11/12 md:w-8/12 bg-white rounded-md p-2 mx-auto max-h-full" ><button onClick={()=>setShowBookingSteps(false)}>cerrar</button>
   <ul className="flex justify-between w-10/12 mx-auto">
    <li onClick={()=>setPaso(1)}>Paso 1: Registro</li>
    <li onClick={()=>setPaso(2)}>Paso 2: Datos</li>
    <li onClick={()=>setPaso(3)}>Paso 3: Pago</li>
   </ul>

   {paso===1 && (
    <div className="grid grid-cols-2 gap-2 mx-auto mt-4">
     <LoginPage/>
    </div>
   )}  
   {paso===2 && <Reservation setPaso={setPaso}/>}    

   </div> 

  </div>
  </>
 )
}