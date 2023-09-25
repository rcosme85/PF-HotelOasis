import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { logout } from "../../redux/actions";
import { logoutFirebase } from "../../Firebase/Providers";

import Tooltip from '@mui/material/Tooltip';
import DarkModeToggle from "../DarkMode/DarkMode";

const navegacionAdmin = [
  { name: "Home", href: "/", current: true },
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Developers", href: "/developers", current: true },
];
const invited = [
  { name: "Home", href: "/", current: true },
  { name: "Contact", href: "/contact", current: true },
{ name: "Developers", href: "/developers", current: true }
];

const navegacionUsuario = [
  { name: "Home", href: "/", current: true },
  { name: "Contact", href: "/contact", current: true },
  { name: "Developers", href: "/developers", current: true },
  { name: "Reservas", href: "/dashboardUser", current: true }
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Establece esto según el estado de inicio de sesión del usuario
  const [isAdmin, setIsAdmin] = useState(false); // Establece esto según el rol del usuario
  const [loggedOut, setloggedOut] = useState(true);

  const { status, photoURL } = useSelector((state) => state.auth);
  const loginAdmin = useSelector((state) => state.auth.admin);


  const getUserData = () => {
    const userDataString = localStorage.getItem("userData");
    return JSON.parse(userDataString);
  };

  // Cambiar de entre invitado, usuario o admin
  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true);
      setloggedOut(false);
    }
    else if (status === "not-authenticated") {
      setloggedOut(true);
      setIsLoggedIn(false);
    }
    if (loginAdmin === true) {
      setIsAdmin(true);
    }
  }, [status, loginAdmin]);

  // ------ Logout ------

  const startLogout = () => {
    return async (dispatch) => {
      await logoutFirebase();
      dispatch(logout());
      navigate("/");
    };
  };

  const logOut = () => {
    dispatch(startLogout());
  };

  const navegacion = isAdmin ? navegacionAdmin : navegacionUsuario;
  return (
    <Disclosure as="nav" className="bg-[#16242f] ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center relative sm:items-stretch sm:justify-start">
                <NavLink
                  to="/"
                  className="flex flex-shrink-0 items-center h-20 md:h-32 absolute -top-4 border"
                >
                  <Tooltip title="Ir al Home" arrow>
      <img
                    className="z-50 h-full max-w-full"
                    src="/logo.jpg"
                    alt="Hotel Oasis"
                  />
    </Tooltip>
                  
                </NavLink>
                {isLoggedIn ? (
                  //links con login admin o no amdmin
                  <div
                    className="hidden sm:ml-6 sm:block"
                    style={{ margin: "auto" }}
                  >
                    
                    <div className="flex space-x-4">
                      {navegacion.map((item) => (
                        
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                        
                      ))}

                    </div>
                  </div>
                ) : (
                  //links sin login
                  <div
                    className="hidden sm:ml-6 sm:block"
                    style={{ margin: "auto" }}
                  >
                    
                    <div className="flex space-x-4">
                      {invited.map((item) => (
                        
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                        
                      ))}

                    </div>
                  </div>
                )}
              </div>
              <div
                className={`flex items-center sm:ml-6 ${
                  loggedOut ? "visible" : "invisible"
                }`}
                style={{ gap: "10px" }}
              >
                                <DarkModeToggle/>
                
                <NavLink to="/register">
                  <h2 className="text-white">Registrarse</h2>
                </NavLink>
                <div className="bg-white w-1 h-8 "></div>
                <NavLink to="/login">
                  <h2 className="text-white">Login</h2>
                </NavLink>
            
              </div>
              {isLoggedIn && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                          <div> <DarkModeToggle/></div>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={photoURL}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                        
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/dashboardUser"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Tu Perfil
                            </NavLink>
                          )}
                          
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/dashboardUser"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Configuraciones
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logOut}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navegacion.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
