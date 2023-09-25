import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert, Button, Grid, Link, TextField, Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import { SaveAlt } from "@mui/icons-material";

import DashUserLayout from "./Layout/DashUserLayout.jsx";
import { logout, updateDisplayName } from "../../redux/actions.js";
import { logoutFirebase } from "../../Firebase/Providers.js";

const MisDatos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email } = useSelector((state) => state.auth);

  // Estados para llenar los campos automaticamente y para hacer el put
  const [id, setId] = useState(""); // Estado para el id
  const [nombres, setNombre] = useState(""); // Estado para el campo de nombre
  const [apellidos, setApellido] = useState(""); // Estado para el campo de apellido
  const [correo, setCorreo] = useState(""); // Estado para el campo de correo
  const [password, setPassword] = useState(false); // Estado para el password
  const [google, setGoogle] = useState(false); // Estado para el usurio de google

  // Estados de verificación
  const [isDirty, setIsDirty] = useState([false, false, false]); // Estado para el cambio en los campos

  // Estados para mostrar algo
  const [showMessage, setShowMessage] = useState(false); // Estado para mostrar el mensaje
  const [showDelete, setShowDelete] = useState(false); // Estado para mostrar el mensaje
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar el mensaje

  const [showEmailField, setShowEmailField] = useState(false); // Estado para mostrar u ocultar el campo de correo

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // Estado para mostrar el diálogo de confirmación para cambiar la contraseña
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // Estado para mostrar el diálogo de confirmación para eliminar la cuenta.

  const isSaveButtonDisabled = isDirty.some((dirty, index) => dirty && !([nombres, apellidos, correo][index]));

  const getId = async () => {
    try {
      const userId = await axios.post( `${import.meta.env.VITE_API_URL}/hotel/users/login`, { email: email } );
      return userId.data.data;
    } catch (error) {
      return { msg: "Error obteniendo los datos del backend: ", error };
    }
  };

  useEffect(() => {
    // Llamada a la función para obtener los datos del backend cuando el componente se monta
    getId().then((userData) => {
      if (userData && userData.id) {
        setId(userData.id);
        setCorreo(userData.email);
        setNombre(userData.nombre);
        setApellido(userData.apellido);
        setPassword(userData.password);
        setGoogle(userData.googleUser);
      }
    });
  }, []);

  // Funciones para manejar los cambios en los campos
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
    setIsDirty([true, isDirty[1], isDirty[2]]);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
    setIsDirty([isDirty[0], true, isDirty[2]]);
  };

  const handleEmailChange = (event) => {
    setCorreo(event.target.value);
    setIsDirty([isDirty[0], isDirty[1], true]);
  };

  ////---------------------------------------------------------------

  // Función para mostrar el mensaje de warning al hacer click en "Cambiar contraseña"
  const toggleWarning = () => {
    setShowWarning(true);
    setTimeout(() => { setShowWarning(false); }, 5000);
  };

  ////---------------------------------------------------------------

  // Función para mostrar u ocultar el campo de correo al hacer click en "Cambiar contraseña"
  const toggleEmailField = () => {
    // Mostrar el diálogo de confirmación antes de mostrar el campo de correo
    setShowConfirmationDialog(true);
  };

  // Función para confirmar que el usuario quiere cambiar la contraseña
  const confirmChangePassword = () => {
    setShowConfirmationDialog(false);
    setShowEmailField(true);
    setPassword(true);
  };
  
  // Función para cancelar el cambio de contraseña
  const cancelChangePassword = () => {
    setShowConfirmationDialog(false);
  };

  ////---------------------------------------------------------------

  // Función para confirmar que el usuario quiere eliminar la cuenta
  const confirmDeleteAccount = () => {
    setShowDeleteDialog(false);
    deleteUser();
  };
  
  // Función para cancelar el cambio de contraseña
  const cancelDeleteAccount = () => {
    setShowDeleteDialog(false);
  };

  ////---------------------------------------------------------------

  // Funcion para guardar los cambios o eliminar la cuenta
  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(event.nativeEvent.submitter.name)

    setIsDirty([false, false, false]);
    setShowEmailField(false);

    // -------- Guardar --------

    if (event.nativeEvent.submitter.name === "Guardar") {

      const dataToSend = {
        nombre: nombres,
        apellido: apellidos,
        email: correo,
        password,
      }
  
      try {
        const response = await axios.put( `${import.meta.env.VITE_API_URL}/hotel/users/${id}`, dataToSend );
  
        if (response.data) {
          setShowMessage(true);
          setTimeout(() => { setShowMessage(false); }, 5000);
          dispatch(updateDisplayName({nombre: nombres, apellido: apellidos}));

          if(password === true){
            setPassword(false);
            // console.log("Se envió un enlace para restablecer la contraseña.");
          }
        }
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    }

    // -------- Eliminar Cuenta --------

    else if (event.nativeEvent.submitter.name === "Eliminar") {
      setShowDeleteDialog(true);
    }
  };

  const deleteUser = async () => {

    const startLogout = async () => {
      await logoutFirebase();
        dispatch(logout());
        navigate("/");
    };

    try {
      const response = await axios.delete( `${import.meta.env.VITE_API_URL}/hotel/users/disable/${id}`);

      if (response.data) {
        console.log("Usuario Eliminado.");
        setPassword(false);
        setShowDelete(true);
        setTimeout(() => { setShowDelete(false); }, 5000);
        setTimeout(() => { startLogout(); }, 8000);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <DashUserLayout title="Mis datos">
      <form onSubmit={onSubmit}>
        <Grid container>

          {/* -------- Nombre -------- */}

          <Grid container alignItems="center" sx={{ mb: 2 }}>
            <Grid item sx={{ mb: 1 }}>
              <Typography color="#000">Nombre:</Typography>
            </Grid>

            <Grid item xs={12} sx={{ mr: 2 }}>
              <TextField
                label={nombres || ""}
                type="text"
                placeholder="Nombre"
                fullWidth
                name="nombre"
                value={nombres}
                onChange={handleNombreChange}
              />
            </Grid>
          </Grid>

          {/* -------- Apellido -------- */}

          <Grid container alignItems="center">
            <Grid item sx={{ mb: 1 }}>
              <Typography color="#000">Apellido:</Typography>
            </Grid>

            <Grid item xs={12} sx={{ mr: 2 }}>
              <TextField
                label={apellidos || ""}
                type="text"
                placeholder="Apellido"
                fullWidth
                name="apellido"
                value={apellidos}
                onChange={handleApellidoChange}
              />
            </Grid>
          </Grid>

          {/* -------- Cambiar contraseña (texto) -------- */}

          <Grid item sx={{ mt: 2 }}>
            <Link
              color="#111E26"
              sx={{ cursor: "pointer" }}
              onClick={google ? toggleWarning : toggleEmailField}
            >
              Cambiar contraseña
            </Link>
            {showWarning && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Como te has registrado con Google, esta opción no se encuentra disponible.
              </Alert>
            )}
          </Grid>

          {/* ---- Campo de correo (mostrado u oculto según el estado) ---- */}

          {showEmailField && (
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Alert severity="info">
                  Se enviará un enlace al correo proporcionado para restablecer
                  la contraseña.
                </Alert>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="email"
                  placeholder="example@example.com"
                  fullWidth
                  name="email"
                  // value=""
                  onChange={handleEmailChange}
                />
              </Grid>
            </Grid>
          )}

          {/* -------- Guardar, Eliminar y Mensaje -------- */}

          <Grid item container justifyContent="space-between" alignItems="center" xs={12} sx={{ mt: 2 }}>

            {/* ~ ~ ~ ~ Guardar ~ ~ ~ ~ */}

            <Button
              sx={{ backgroundColor: "#38a169", "&:hover": { backgroundColor: "#56c196" }, mr: 1, }}
              disabled={!isDirty.some((dirty, index) => dirty) ||isSaveButtonDisabled}
              title="Guardar"
              type="submit"
              variant="contained"
              name="Guardar"
            >
              <Typography sx={{ mr: 1, textTransform: 'none' }}>
                {`${"Guardar".charAt(0).toUpperCase()}${"Guardar".slice(1).toLowerCase()}`}
              </Typography>

              <SaveAlt />
            </Button>

            {/* ~ ~ ~ ~ Mensajes ~ ~ ~ ~ */}

            <Grid item display={showMessage ? "" : "none"}>
              <Alert severity="success">
                Datos actualizados satisfactoriamente.
              </Alert>
            </Grid>

            <Grid item display={showDelete ? "" : "none"}>
              <Alert severity="error">
                ¡Cuenta Eliminada!
              </Alert>
            </Grid>

            {/* ~ ~ ~ ~ Eliminar Cuenta ~ ~ ~ ~ */}

            <Button
              sx={{ backgroundColor: "#FF0000", "&:hover": { backgroundColor: "#DC143C" }, ml: 1, }}
              title="Eliminar Cuenta"
              type="submit"
              variant="contained"
              name="Eliminar"
            >
              <Typography sx={{ textTransform: 'none' }}>
              {`${"Eliminar cuenta".charAt(0).toUpperCase()}${"Eliminar cuenta".slice(1).toLowerCase()}`}
              </Typography>

            </Button>
          </Grid>
        </Grid>
      </form>

      {/* --------- Diálogo de confirmación para cambiar la contraseña o eliminar la cuenta --------- */}

      <Dialog open={showConfirmationDialog || showDeleteDialog} onClose={cancelChangePassword || cancelDeleteAccount}>
        {
          showConfirmationDialog ? (
            <>
              <DialogTitle>Confirmar Cambio de Contraseña</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  ¿Está seguro de que quiere cambiar la contraseña?
                </DialogContentText>
              </DialogContent>

              <DialogActions>

                <Button onClick={cancelChangePassword} color="primary">
                  Cancelar
                </Button>

                <Button onClick={confirmChangePassword} color="primary" autoFocus>
                  Confirmar
                </Button>

              </DialogActions>
            </>
          )
          : showDeleteDialog ? (
            <>
              <DialogTitle>Confirma para Eliminar la Cuenta</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  ¿Está seguro de que quiere eliminar definitivamente la cuenta?
                </DialogContentText>
              </DialogContent>

              <DialogActions>

                <Button onClick={cancelDeleteAccount} style={{ color: "#FF0000" }} autoFocus>
                  Cancelar
                </Button>

                <Button onClick={confirmDeleteAccount} style={{ color: "#FF0000" }}>
                  Confirmar
                </Button>

              </DialogActions>
            </>
          )
          : null
        }
      </Dialog>
    </DashUserLayout>
  );
};

export default MisDatos;
