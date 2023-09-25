import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { FirebaseAuth } from "./Config";

const googleProvider = new GoogleAuthProvider();

// -------- Registro y login con google --------

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // si se llegase a necesetiar el token se puede utilizar de las
    // credenciales, es decir, del código comentado de arriba.
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      //User Info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    // si se desea más información acerca del error, se pueden mostrar los siguentes mensajes

    // The email of the user's account used.
    // const email = error.customData.email;

    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);

    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

// -------- Registro del Usuario --------

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const user = resp.user;

    await sendEmailVerification(user);

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid: user.uid,
      displayName,
      email,
      photoURL: user.photoURL,
    };
  } catch (error) {
    const errorMessage = "Este usuario ya se encuentra registrado.";
    return { ok: false, errorMessage };
  }
};

// -------- Login Normal --------

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL, displayName, } = resp.user;
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    const errorMessage = "Este usuario no existe.";
    return { ok: false, errorMessage };
  }
};

// -------- Cerrar sesion --------

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
