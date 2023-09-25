import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadAllTypesRooms, filterTypesRooms } from "../../redux/actions";

const DetailsRooms = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.typesRooms);
  const { subtipo } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadAllTypesRooms());
      await dispatch(filterTypesRooms(subtipo));
    };
    fetchData();
  }, [dispatch, subtipo]);

  return (
    <div className="bg-gray-100 dark:bg-[#111827]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            HABITACIONES NIVEL {subtipo.toUpperCase()}
          </h2>
          <div>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {types.map((room) => (
                <div key={room.id} className="group relative mb-8">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={room.image}
                      alt={room.descripcion}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-lg text-center text-gray-900 dark:text-white mb-2">
                    <span className=" absolute inset-0"></span>
                    {room.tipo_Habitacion}
                  </h3>
                  <p className="text-base font-semibold text-center  text-gray-500 dark:text-white mb-2">
                    {room.descripcion}
                  </p>
                  <p className="text-base font-semibold text-center text-gray-500 dark:text-white mb-2">
                    {room.caracteristica}
                  </p>
                  <p className="text-base font-semibold text-center dark:text-white text-gray-500">
                    Precio: ${room.precio} USD
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsRooms;
