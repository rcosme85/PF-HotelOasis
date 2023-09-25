export const SEARCH_ROOMS = "SEARCH_ROOMS";
export const DETAIL_ROOM = "DETAIL_ROOM";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const TYPES_ROOMS = "TYPES_ROOMS";
export const FILTER_TYPES_ROOMS = "FILTER_TYPES_ROOMS";
export const ORDER_ROOMS = "ORDER_ROOMS";
export const SAVE_PAGE = "SAVE_PAGE";
export const GET_CLIENTES = "GET_CLIENTES";
export const PUT_CLIENTES = "PUT_CLIENTES";
export const GET_USERS = "GET_USERS";
export const PUT_USERS = "PUT_USERS";
export const GET_HABITACIONES = "GET_HABITACIONES";
export const PUT_HABITACIONES = "PUT_HABITACIONES";
export const GET_TIPOS_HABITACIONES = "GET_TIPOS_HABITACIONES";
export const PUT_TIPOS_HABITACIONES = "PUT_TIPOS_HABITACIONES";
export const GET_RESERVAS = "GET_RESERVAS";
export const PUT_RESERVAS = "PUT_RESERVAS";

export const PUT_HABITACIONES_DETAIL = "PUT_HABITACIONES_DETAIL";
//  Authentication
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHECKING_CREDENTIALS = "CHECKING_CREDENTIALS";
export const UPDATE_DISPLAYNAME = "UPDATE_DISPLAYNAME";

import axios from "axios";

export const GetHabitaciones = ()=>{
  return async(dispatch)=>{
  let response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/habitaciones`)
  dispatch({
   type: GET_HABITACIONES,
   payload: response.data.data   
  }) 
  }
}
export const PutHabitacionDetail = (id, habitacion)=>{
  return async(dispatch)=>{
  let response = await axios.put(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle/put/${id}`, habitacion)
  dispatch({
   type: PUT_HABITACIONES_DETAIL,
   payload: response.data.data   
  }) 
  }
}

export const PutHabitacion = (id, habitacion) => {
  return async (dispatch) => {
    let response = await axios.put(
      `${import.meta.env.VITE_API_URL}/hotel/habitaciones/put/${id}`,
      habitacion
    );
    dispatch({
      type: PUT_HABITACIONES,
      payload: response.data.data,
    });
  };
};

export const GetTiposHabitaciones = ()=>{
  return async(dispatch)=>{
  let response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle`)
  ///orden
  response.data.data.sort((a, b) => {
    // Comparamos los valores de nombre y apellido en cada objeto
    const nombreCompletoA = `${a.tipo_Habitacion} ${a.subTipo}`;
    const nombreCompletoB = `${b.tipo_Habitacion} ${b.subTipo}`;  
    // Realizamos la comparación
    if (nombreCompletoA < nombreCompletoB) {
      return -1; // Si 'a' es menor que 'b', retorna un número negativo
    }
    if (nombreCompletoA > nombreCompletoB) {
      return 1; // Si 'a' es mayor que 'b', retorna un número positivo
    }
    return 0; // Si son iguales, retorna 0
  });

  dispatch({
   type: GET_TIPOS_HABITACIONES,
   payload: response.data.data   
  }) 
  }
}
export const PutTipoHabitacion = (id, habitacion) => {
  return async (dispatch) => {
    let response = await axios.put(
      `${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle/put/${id}`,
      habitacion
    );
    dispatch({
      type: PUT_TIPOS_HABITACIONES,
      payload: response.data.data,
    });
  };
};
export const PutUsers = (id, user) => {
  return async (dispatch) => {
    let response = await axios.put(
      `${import.meta.env.VITE_API_URL}/hotel/users/${id}`,
      user
    );
    dispatch({
      type: PUT_USERS,
      payload: response.data.data,
    });
  };
};

export const GetUsers = () => {
  return async (dispatch) => {
    let response = await axios.get(
      `${import.meta.env.VITE_API_URL}/hotel/users`
    );
    ///orden
  response.data.data.sort((a, b) => {
    // Comparamos los valores de nombre y apellido en cada objeto
    const nombreCompletoA = `${a.nombre} ${a.apellidos}`;
    const nombreCompletoB = `${b.nombre} ${b.apellidos}`;  
    // Realizamos la comparación
    if (nombreCompletoA < nombreCompletoB) {
      return -1; // Si 'a' es menor que 'b', retorna un número negativo
    }
    if (nombreCompletoA > nombreCompletoB) {
      return 1; // Si 'a' es mayor que 'b', retorna un número positivo
    }
    return 0; // Si son iguales, retorna 0
  });
    dispatch({
      type: GET_USERS,
      payload: response.data.data,
    });
  };
};

export const PutClientes = (doc, cliente) => {
  return async (dispatch) => {
    let response = await axios.put(
      `${import.meta.env.VITE_API_URL}/hotel/clientes/${doc}`,
      cliente
    );    
    dispatch({
      type: PUT_CLIENTES,
      payload: response.data.data,
      doc: doc
    });
  };
};

export const GetClientes = () => {
  return async (dispatch) => {
    let response = await axios.get(
      `${import.meta.env.VITE_API_URL}/hotel/clientes`
    );
    ///orden
  response.data.data.sort((a, b) => {
    // Comparamos los valores de nombre y apellido en cada objeto
    const nombreCompletoA = `${a.nombre} ${a.apellidos}`;
    const nombreCompletoB = `${b.nombre} ${b.apellidos}`;  
    // Realizamos la comparación
    if (nombreCompletoA < nombreCompletoB) {
      return -1; // Si 'a' es menor que 'b', retorna un número negativo
    }
    if (nombreCompletoA > nombreCompletoB) {
      return 1; // Si 'a' es mayor que 'b', retorna un número positivo
    }
    return 0; // Si son iguales, retorna 0
  });
    dispatch({
      type: GET_CLIENTES,
      payload: response.data.data,
    });
  };
};

export const GetReservas = ()=>{
  return async(dispatch)=>{
  let response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/reservas`)
  ///orden
  response.data.data.sort((a, b) => {
    const fechaA = new Date(a.fechaIngreso);
    const fechaB = new Date(b.fechaIngreso);
  // Compara las fechas y devuelve un valor negativo, cero o positivo
    // para determinar el orden ascendente.
    return fechaA - fechaB;
  });
  /// solo se cargan las reservas de hoy o mayores
  const fechaHoy = new Date();
  // Filtra el array para mantener solo los objetos cuya 'fechaIngreso' sea igual o mayor que 'fechaHoy'.
const reservasFiltradas = response.data.data.filter(objeto => new Date(objeto.fechaSalida) >= fechaHoy);

  dispatch({
   type: GET_RESERVAS,
   payload: reservasFiltradas   
  }) 
  }
}

export const PutReservas = (id, reserva) => {
  return async (dispatch) => {
    let response = await axios.put(
      `${import.meta.env.VITE_API_URL}/hotel/reservas/${id}`,
      reserva
    );    
    dispatch({
      type: PUT_RESERVAS,
      payload: response.data.data,
      id: id
    });
  };
};

export const searchRooms = (search) => {
  // console.log("buscar", search);
  return async (dispatch) => {
    try {
      let filtroFechas = {
        fechaIngreso: search.fechaIn,
        fechaSalida: search.fechaOut,
      };
      //console.log('filtro',filtroFechas)
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/hotel/filtros`,
        filtroFechas
      );
      let data = response.data.data;
      ///se filtra dependiendo del total de pax
      let pax = Number(search.adultos) + Number(search.niños);

      var dataNew = data.filter(function (habitacion) {
        return habitacion.capacidad <= pax;
      });

      dataNew = dataNew.sort(function (a, b) {
        return b.capacidad - a.capacidad;
      });

      return dispatch({
        type: "SEARCH_ROOMS",
        payload: dataNew,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const detailRoom = (id) => {
  return {
    type: "DETAIL_ROOM",
    payload: id,
  };
};

export const filterRoom = (filter) => {
  return {
    type: "FILTER_ROOMS",
    payload: filter,
  };
};

export const orderRoom = (order) => {
  return {
    type: "ORDER_ROOMS",
    payload: order,
  };
};

export const loadAllTypesRooms = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle`
      );
      let data = response.data.data;
      //console.log('data',data)
      return dispatch({
        type: "TYPES_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterTypesRooms = (filter) => {
  return {
    type: "FILTER_TYPES_ROOMS",
    payload: filter,
  };
};

export const savePage = (page) => {
  return {
    type: "SAVE_PAGE",
    payload: page,
  };
};

// ----- Authentication -----

export const login = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const logout = (payload) => {
  return {
    type: LOGOUT,
    payload,
  };
};

export const checkingCredentials = () => {
  return {
    type: CHECKING_CREDENTIALS,
  };
};

export const updateDisplayName = (payload) => {
  return{
    type: UPDATE_DISPLAYNAME,
    payload,
  }
};