import { FirebaseAuth } from "../Firebase/Config";

import {
  PUT_CLIENTES,
  GET_CLIENTES,
  SEARCH_ROOMS,
  DETAIL_ROOM,
  FILTER_ROOMS,
  ORDER_ROOMS,
  TYPES_ROOMS,
  FILTER_TYPES_ROOMS,
  SAVE_PAGE,
  LOGIN,
  LOGOUT,
  CHECKING_CREDENTIALS,
  PUT_USERS,
  GET_USERS,
  GET_HABITACIONES,
  PUT_HABITACIONES,
  PUT_HABITACIONES_DETAIL,
  GET_TIPOS_HABITACIONES,
  PUT_TIPOS_HABITACIONES,
  UPDATE_DISPLAYNAME,
  GET_RESERVAS,
  PUT_RESERVAS
} from "./actions";

const initialState = {
  habitaciones: [],
  users: [],
  clientes: [],
  rooms: [],
  allRooms: [],
  room: {},
  filters: [],
  order: "Capacidad",
  typesRooms: [],
  allTypesRooms: [],
  page: 1,
  reservas: [],
  // Authentication
  auth: {
    status: "checking", // authenticated, not-authenticated, checking
    uid: null,
    displayName: null,
    nombre: null,
    apellido: null,
    email: null,
    photoURL: null,
    errorMessage: null,
    admin: false,
    user: false,
  },
};

function ordenar(array, order) {
  let roomsOrder = array;
  let newRoomsOrder = [];
  if (order === "Precio Menor") {
    newRoomsOrder = roomsOrder.sort(function (a, b) {
      return a.precio - b.precio;
    });
  } else if (order === "Precio Mayor") {
    newRoomsOrder = roomsOrder.sort(function (a, b) {
      return b.precio - a.precio;
    });
  } else if (order === "Capacidad") {
    newRoomsOrder = roomsOrder.sort(function (a, b) {
      return b.capacidad - a.capacidad;
    });
  } else if (order === "Name") {
    newRoomsOrder = roomsOrder.sort((a, b) => {
      if (a[order] < b[order]) {
        return -1;
      }
      if (a[order] > b[order]) {
        return 1;
      }
      return 0;
    });
  }
  //
  return newRoomsOrder;
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HABITACIONES:
      return {
        ...state,
        habitaciones: [...action.payload],
      };

    case PUT_HABITACIONES:
      const updatedHabIndex = state.habitaciones.findIndex(
        (h) => h.id === action.payload.id
      );
      const updatedHabs = [...state.habitaciones];
      updatedHabs[updatedHabIndex] = action.payload;
      return {
        ...state,
        habitaciones: updatedHabs,
      };
    case PUT_HABITACIONES_DETAIL:
      const updatedHabDetIndex = state.allRooms.findIndex(
        (h) => h.id === action.payload.id
      );
      const updatedHabsDet = [...state.allRooms];
      updatedHabsDet[updatedHabDetIndex] = action.payload;
      return {
        ...state,
        allRooms: updatedHabsDet,
      };
    case GET_TIPOS_HABITACIONES:
      return {
        ...state,
        habitaciones: [...action.payload],
      };

    case PUT_TIPOS_HABITACIONES:
      const updatedTiposHabIndex = state.habitaciones.findIndex(
        (h) => h.id === action.payload.id
      );
      const updatedTiposHabs = [...state.habitaciones];
      updatedTiposHabs[updatedTiposHabIndex] = action.payload;
      return {
        ...state,
        habitaciones: updatedTiposHabs,
      };
    case PUT_USERS:
      const updatedUserIndex = state.users.findIndex(
        (u) => u.id === action.payload.id
      );
      const updatedUsers = [...state.users];
      updatedUsers[updatedUserIndex] = action.payload;
      return {
        ...state,
        users: updatedUsers,
      };
    case GET_USERS:
      return {
        ...state,
        users: [...action.payload],
      };

    case PUT_CLIENTES:
      const updatedClientIndex = state.clientes.findIndex(
        (client) => client.doc_Identidad === action.doc
      );
      // Crea una copia del array de clientes actual y reemplaza el cliente modificado en el índice correspondiente
      const updatedClientes = [...state.clientes];
      updatedClientes[updatedClientIndex] = action.payload;
      return {
        ...state,
        clientes: [...updatedClientes],
      };
    case GET_CLIENTES:
      return {
        ...state,
        clientes: [...action.payload],
      };
      case GET_RESERVAS:
      return {
        ...state,
        reservas: [...action.payload],
      };
      case PUT_RESERVAS:
      const updatedReservaIndex = state.habitaciones.findIndex(
        (h) => h.id === action.payload.id
      );
      const updatedReserva = [...state.habitaciones];
      updatedReserva[updatedReservaIndex] = action.payload;
      return {
        ...state,
        habitaciones: updatedReserva,
      };
    case SEARCH_ROOMS:
      let newRoomsSearch = [...action.payload];
      //se aplican los filtros
      newRoomsSearch = action.payload.filter((room) =>
        state.filters.every((filtroItem) =>
          room.caracteristica.includes(filtroItem)
        )
      );
      let newRoomsSearchOrder = ordenar(newRoomsSearch, state.order);

      return {
        ...state,
        rooms: [...newRoomsSearchOrder],
        allRooms: [...action.payload],
      };

    case DETAIL_ROOM:
      const rooms = [...state.allRooms];
      const room = rooms.find((r) => r.id === action.payload);
      return {
        ...state,
        room: room,
      };

    case FILTER_ROOMS:
      const roomsFilter = [...state.allRooms];
      const filter = action.payload;
      const newRooms = roomsFilter.filter((room) =>
        filter.every((filtroItem) => room.caracteristica.includes(filtroItem))
      );
      // console.log("filtro:", filter);
      // console.log("Resultado:", newRooms);
      return {
        ...state,
        rooms: [...newRooms],
        filters: [...action.payload],
      };

    case ORDER_ROOMS:
      const roomsOrder = [...state.allRooms];
      const order = action.payload;
      let newRoomsOrder = ordenar(roomsOrder, order);
      return {
        ...state,
        rooms: [...newRoomsOrder],
        order: action.payload,
      };

    case TYPES_ROOMS:
      return {
        ...state,
        typesRooms: [...action.payload],
        allTypesRooms: [...action.payload],
      };

    case FILTER_TYPES_ROOMS:
      const typesRoomsFilter = [...state.allTypesRooms];
      const filterTypes = action.payload;

      //filtramos los tipos de habitaciones donde subTipo sea igual al filterTypes
      const newTypesRooms = typesRoomsFilter.filter((room) => {
        return room.subTipo === filterTypes;
      });

      return {
        ...state,
        typesRooms: [...newTypesRooms],
      };

    case SAVE_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    // ----- Authentication -----

    case UPDATE_DISPLAYNAME:
      return {
        ...state,
        auth: {
          ...state.auth,
          displayName: `${action.payload.nombre} ${action.payload.apellido}`,
        },
      };

    case LOGIN:
      const { displayName, nombre, apellido, email, photoURL } = action.payload;

      // Verifica si el correo está confirmado
      const isEmailVerified = FirebaseAuth.currentUser?.emailVerified || false;

      // Determina si el usuario es administrador
      const isAdmin = email === "pf.henry40a@gmail.com";

      return {
        ...state,
        auth: {
          status: isEmailVerified
            ? "authenticated"
            : "Waiting for confirmation",
          uid: action.payload.uid,
          displayName: displayName || `${nombre} ${apellido}`,
          nombre: nombre,
          apellido: apellido,
          email: email,
          photoURL:
            photoURL ||
            "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          errorMessage: null,
          admin: isAdmin,
          user: true,
        },
      };

    case LOGOUT:
      return {
        ...state,
        auth: {
          status: "not-authenticated",
          uid: null,
          displayName: null,
          nombre: null,
          apellido: null,
          email: null,
          photoURL: null,
          errorMessage: action.payload ? action.payload : null,
          admin: false,
          user: false,
        },
      };

    case CHECKING_CREDENTIALS:
      return {
        ...state,
        auth: {
          ...state.auth,
          status: "checking",
        },
      };

    default:
      return { ...state };
  }
}
