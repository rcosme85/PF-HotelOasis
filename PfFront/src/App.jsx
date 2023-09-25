import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// ----- Actions -----

// import { loadAllTypesRooms } from "./redux/actions";

// ----- Vistas -----

import PassRecoverPage from "./views/Auth/Pages/PassRecoverPage";
import RegisterPage from "./views/Auth/Pages/RegisterPage";
import LoginPage from "./views/Auth/Pages/LoginPage";
import DetailsRooms from "./views/Details/Details";
import Sidebar from "./views/DashBoard/DashBoard";
import ErroPage from "./views/Error404/Error404";
import AboutUs from "./views/AboutUs/AboutUs";
import Home from "./views/Home/Home";

// ----- Componentes -----

import Reservation from "./components/ReservationForm/Reservation";
import SearchRoom from "./components/SearchComponent/SearchRoom";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import { CheckingAuth } from "./components/Login/CheckingAuth";
import CorreoForm from "./components/ContactForm/CorreoForm";
import PaymenView from "./components/Payment/PaymenView";
import PopDetail from "./components/PopDetail/PopDetail";
import ReviewStars from "./components/pruebas/pruebas";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ReviewUser from "./views/DashBoardUser/ReviewsUser";

// ----- Hooks -----

import { useCheckAuth } from "./Hooks/useCheckAuth";

// ----- Estilos -----

import "./App.css";
import DashboardUser from "./views/DashBoardUser/DashboardUser";
import Developers from "./components/Developers/Developers";

function App() {
  const [showLayout, setShowLayout] = useState(true);

  // Verificar la ruta actual y decidir si mostrar el diseño completo o no
  useEffect(() => {
    const currentPath = window.location.pathname;
    setShowLayout(
      currentPath !== "/error" &&
        currentPath !== "/recover" &&
        currentPath !== "/mercadopago"
    );
  }, []);

  // ------ Authentication ------

  const status = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <>
      {showLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErroPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/pop" element={<PopDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchRoom />} />
        <Route path="/dashboard" element={<Sidebar />} />
        <Route path="/payment" element={<PaymenView />} />
        <Route path="/contact" element={<CorreoForm />} />
        <Route path="/reserve" element={<Reservation />} />
        <Route path="/pruebas" element={<ReviewStars />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<PassRecoverPage />} />
        <Route path="/mercadopago" element={<MercadoPago />} />
        <Route path="/details/:subtipo" element={<DetailsRooms />} />
        <Route path="/dashboardUser" element={<DashboardUser />} />
        <Route path="/reviewUser" element={<ReviewUser />} />
        <Route path="/developers" element={<Developers />} />
      </Routes>
      {showLayout && <Footer />}
    </>
  );
}

export default App;
