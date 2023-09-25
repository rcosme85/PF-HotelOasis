import React, { useEffect } from "react";
import Room from "../Room/Room";

const Rooms = ({ allTypesRooms }) => {
  return (
    <div>
      <div>
        {allTypesRooms?.map((room) => (
          <Room
            key={room.id}
            id={room.id}
            image={room.image}
            tipo_Habitacion={room.tipo_Habitacion}
            subTipo={room.subTipo}
            precio={room.precio}
          />
        ))}
      </div>
    </div>
  );
};
export default Rooms;
