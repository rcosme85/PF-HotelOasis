import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartRooms({
  state,
  close,
  arrayRooms = [],
  remove,
  dias,
  quantityTotal,
  increseQuantity,
  decreaseQuantity,
  showBooking,
}) {

  ///si no esta logueado se envia a la pagina de login
  const { status, photoURL } = useSelector((state) => state.auth);
  const loginAdmin = useSelector((state) => state.auth.admin);
  const navigate = useNavigate();

  const [open, setOpen] = useState(state);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState(arrayRooms);

  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openReserva = () => {
if(status === "authenticated"){
  navigate('/reserve')
}else{
  alert('Necesitas primero Iniciar Sesión')
  navigate('/login')
}
  }

  useEffect(() => {
    setProducts(arrayRooms);
  }, [arrayRooms]);

  useEffect(() => {
    let sumaPrecios = 0;

    if (products.length > 0) {
      products.forEach((item) => {
        sumaPrecios += item.precio;
      });
    }

    setTotalPrice(sumaPrecios);
  }, [quantityTotal, products]);

  const handleIncreaseQuantity = (itemId) => {
    increseQuantity(itemId);
    // Actualiza el estado local de products aquí si es necesario
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
    // Actualiza el estado local de products aquí si es necesario
  };
  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      remove(productToDelete);
      setProductToDelete(null);
    }
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setIsModalOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={close}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products?.length > 0 &&
                              products?.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.subTipo}
                                          </a>
                                        </h3>
                                        <p className="ml-4">{product.precio}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.tipo_Habitacion}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Cnt {product.quantity}
                                      </p>
                                      <div className="flex gap-10">
                                        <button
                                          onClick={() =>
                                            handleIncreaseQuantity(product.id)
                                          } // Aumentar quantity
                                          type="button"
                                          className="text-xl text-indigo-600 hover:text-indigo-500"
                                        >
                                          +
                                        </button>
                                        <button
                                          onClick={() =>
                                            decreaseQuantity(product.id)
                                          } // Disminuir quantity
                                          type="button"
                                          className="text-xl text-indigo-600 hover:text-indigo-500"
                                        >
                                          -
                                        </button>
                                      </div>
                                      <div className="flex">
                                        <button
                                          onClick={()=> handleDelete(product.id)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Los impuestos estan incluidos.
                      </p>
                      <div className="mt-6">
                        <button
                          
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                          onClick={openReserva}
                        >
                          Reservar
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={close}
                          >
                            Continuar Reservando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                  {isModalOpen && (
         <Modal
         isOpen={isModalOpen}
         onRequestClose={cancelDelete}
         contentLabel="Confirmación"
         className="fixed inset-0 flex items-center justify-center outline-none"
         overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 z-20"
       >
         <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
           <h2 className="text-xl font-semibold mb-4">
             ¿Está seguro de borrar este ítem?
           </h2>
           <div className="flex justify-end">
             <button
               onClick={confirmDelete}
               className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mr-2"
             >
               Confirmar
             </button>
             <button
               onClick={cancelDelete}
               className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
             >
               Cancelar
             </button>
           </div>
         </div>
       </Modal>
      )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
