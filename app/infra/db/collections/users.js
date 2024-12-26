import { db } from '../firebase.config';
import { collection, setDoc, doc, getDoc } from "firebase/firestore";

const usersCollection = collection(db, 'users');


export const addUser = async (user) => {
    await setDoc(doc(usersCollection, user.id), {
        nome: user.nome, 
        email: user.email
    });
}

export const getUser = async (id) => {
    const user = await getDoc(doc(usersCollection, id));
    return {...user.data(), id: user.id};
}

// export const getUsers = async () => {
//     const users = [];
//     const querySnapshot = await getDocs(usersCollection);
//     querySnapshot.forEach((doc) => {
//         users.push(doc.data());
//     });
//     return users;
// }

// export const deleteUser = async (id) => {
//     await deleteDoc(doc(usersCollection, id));
// }