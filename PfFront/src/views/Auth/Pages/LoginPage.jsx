import axios from "axios";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Grid, Typography, TextField, Button, Link, Alert, getDialogActionsUtilityClass, } from "@mui/material";
import { Google } from "@mui/icons-material";

import AuthLayout from "../Layout/AuthLayout";
import { useForm } from "../../../Hooks/useForm";
import { checkingCredentials, login, logout } from "../../../redux/actions";
import {
  loginWithEmailPassword,
  singInWithGoogle,
} from "../../../Firebase/Providers";

const LoginPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { status, errorMessage } = useSelector((state) => state.auth);

  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  useEffect(() => {
    if (status === "authenticated") {
      navigate("/");
    }
  }, [status]);

  // Obtener el usuario que se intenta registrar
  const getId = async (correo) => {
    try {
      const userId = await axios.post(`${import.meta.env.VITE_API_URL}/hotel/users/login`, { email: correo });
      return userId.data;
    } catch (error) {
      return { msg: "Error obteniendo los datos del backend: ", error };
    }
  };

  // ----- Inicio con Google -----

  const startGoogleSignIn = () => {
    return async (dispatch) => {
      dispatch(checkingCredentials());
      const result = await singInWithGoogle();
      if (!result.ok) return dispatch(logout(result.errorMessage));

      dispatch(login(result));
      return result;
    };
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn()).then(async (result) => {
      if (result.ok) {
        // Creando una copia de result
        const resultCopia = { ...result };

        getId(resultCopia.email)
        .then( async (result) => {
          if(result.error) {
              // Nuevo result
            const newResult = {
              id: resultCopia.uid,
              nombre: resultCopia.displayName,
              apellido: "",
              email: resultCopia.email,
              googleUser: true,
              admin: (resultCopia.email === "pf.henry40a@gmail.com") ? true : false,
            };

            try {
              const response = await axios.post( `${import.meta.env.VITE_API_URL}/hotel/users`, newResult );
              if (response.data) {
                console.log("Usuario creado", response.data);
              }
            } catch (error) {
              console.error("Error sending data to backend:", error);
            }
          }
        });
      }
    });
  };

  // ----- Inicio con Login -----

  const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
      dispatch(checkingCredentials());

      const result = await loginWithEmailPassword({ email, password });
      if (!result.ok) return dispatch(logout(result.errorMessage));
      dispatch(login(result));
    };
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          {/* Correo */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="example@example.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          {/* Contraseña */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container display={!!errorMessage ? "" : "none"} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* Normal Login */}
            <Grid item xs={12} sm={6}>
              <Button
                sx={{
                  backgroundColor: "#111E26",
                  "&:hover": { backgroundColor: "#1e3451" },
                }}
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            {/* Google Login */}
            <Grid item xs={12} sm={6}>
              <Button
                sx={{
                  backgroundColor: "#111E26",
                  "&:hover": { backgroundColor: "#1e3451" },
                }}
                disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link component={RouterLink} color="#111E26" to="/register">
                Crear una cuenta
              </Link>
            </Grid>

            <Grid item>
              <Link component={RouterLink} color="#111E26" to="/recover">
                Olvidé mi contraseña
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
