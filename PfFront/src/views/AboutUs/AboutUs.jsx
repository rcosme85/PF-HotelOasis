import styles from "./AboutUs.module.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mapIcon from "/logo.jpg";

const AboutUs = () => {
  const latitude = -31.410677;
  const longitude = -64.192890;
  
  const position = [latitude, longitude];
  const markerIcon = L.icon({
    iconUrl: mapIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="mt-20 dark:bg-[#16242f]">
      {/* <h1 className={styles["heading"]}>About Us - Oasis Hotel</h1>
      <p className={styles["text"]}>
        Welcome to Oasis Hotel! We are dedicated to providing a memorable and
        relaxing experience for our guests.
      </p>
      <p className={styles["text"]}>Our Mission:</p>
      <ul className={styles["mission-list"]}>
        <li className={styles["mission-item"]}>
          Deliver exceptional hospitality and service
        </li>
        <li className={styles["mission-item"]}>
          Offer luxurious and comfortable accommodations
        </li>
        <li className={styles["mission-item"]}>
          Create an oasis of tranquility for our guests
        </li>
      </ul>
      <p className={styles["text"]}>
        Whether you are traveling for business or leisure, Oasis Hotel is the
        perfect destination for your stay.
      </p>
      <p className={styles["text"]}>
        Contact us for reservations and inquiries. We look forward to serving
        you!
      </p>

      <div className={styles["map-container"]}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ width: "100%", height: "400px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={markerIcon} />
        </MapContainer>
      </div> */}
      <h1 className="text-center dark:bg-[#111827] text-2xl text-gray-900 font-bold md:text-4xl dark:text-white">
        Oasis Hotel
      </h1>
      <div className="py-16 bg-white dark:bg-[#111827]">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:w-5/12">
              <img
                src="https://images.unsplash.com/photo-1650967123062-3de70b7bf331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
                alt="image"
                loading="lazy"
                width=""
                height=""
              />
            </div>
            <div className="flex flex-col items-center gap-10 md:w-6/12">
              <h2 className="text-2xl text-gray-600 dark:text-white">
                ¡Bienvenido al Hotel Oasis! Estamos dedicados a proporcionar una
                experiencia memorable y relajante para nuestros huéspedes.
              </h2>
              <p className="text-1xl text-gray-600 dark:text-white">
                Nuestra Misión: Brindar hospitalidad y servicio excepcionales
                Ofrecer alojamientos lujosos y cómodos Crear un oasis de
                tranquilidad para nuestros huéspedes Ya sea que estés viajando
                por negocios o por placer, el Hotel Oasis es el destino perfecto
                para tu estancia. Contáctanos para hacer reservaciones y
                consultas. ¡Esperamos poder atenderte!
              </p>
              <h1 className="text-2xl text-gray-900 font-bold md:text-4xl dark:text-white">
                Nuestra Ubicacion
              </h1>
              <div className={styles["map-container"]}>
                <MapContainer
                  center={position}
                  zoom={15}
                  style={{ width: "100%", height: "400px" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={position} icon={markerIcon} />
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
