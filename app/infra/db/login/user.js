import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addUser } from "../collections/users";
import { setCookie, destroyCookie } from "nookies";

export const criarUsuario = async (usuario) => {

    let usuarioCriado = null

    await createUserWithEmailAndPassword(auth, usuario.email, usuario.password)
        .then(async (userCredential) => {
            usuarioCriado = userCredential.user;
            await addUser({
                id: usuarioCriado.uid,
                nome: usuario.nome,
                email: usuario.email
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

    return usuarioCriado;
}

export const efetuarLogin = async (email, password) => {

    let usuario = null;
    let token = null;

    await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            usuario = userCredential.user;
            token = await userCredential.user.getIdToken();
            setCookie(null, "token", token, { path: "/" });
            sessionStorage.setItem("user", JSON.stringify({ id: usuario.uid, email: email }));

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })

    return usuario;
}

export const efetuarLogout = async () => {
    destroyCookie(null, "token", { path: "/" });
    await auth.signOut();
    sessionStorage.removeItem("user");
}

export const getUsuarioLogado = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(sessionStorage.getItem("user"));
    }
    return null;
}