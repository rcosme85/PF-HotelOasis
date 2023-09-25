import React from 'react'
import { useEffect , useState } from 'react';
const localStorgae = () => {
const [localStorageRooms, setLocalStorageRooms] = useState(["hola"]) //localStorage
    //Rooms LocalStorage :
useEffect(() => {
    // Cargar datos del carrito desde localStorage al cargar la página
    const savedRooms = localStorage.getItem('rooms');
    if (savedRooms) {
      setLocalStorageRooms(JSON.parse(savedRooms));
    }
  }, []);


  useEffect(() => {
    // Guardar datos del carrito en localStorage cuando cambien
    localStorage.setItem('rooms', JSON.stringify(localStorageRooms));
  }, [localStorageRooms]);

  //añadir habitacion
const addToCart = (item) => {
    setLocalStorageRooms([...localStorageRooms, item]);
  };



  return (
    <div>localStorgae</div>
  )
}

export default localStorgae