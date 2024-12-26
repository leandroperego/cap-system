import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase.config';
import { getUsuarioLogado } from "../login/user";

const fornecedorCollection = collection(db, 'imoveis');

export const addImovel = async (imovel) => {
    const user = getUsuarioLogado();
    const imovelData = { ...imovel, userRef: user.id }

    let imovelId = null;

    await addDoc(fornecedorCollection, imovelData)
        .then((docRef) => {
            imovelId = docRef.id;
        })
        .catch((error) => {
            console.log(error);
        });

    return imovelId;
}

export const getImoveis = async () => {
    const user = await getUsuarioLogado();

    const imoveis = [];

    if (user) {
        const querySnapshot = await getDocs(fornecedorCollection);
        querySnapshot.forEach((doc) => {
            if (doc.data().userRef === user.id) {
                imoveis.push({ ...doc.data(), id: doc.id });
            }
        });
    }
    return imoveis;
}

export const getImovel = async (id) => {
    const imovel = await getDoc(doc(fornecedorCollection, id));
    return imovel.data();
}

export const updateImovel = async (id, dataUpdate) => {
    let validacao = false;
    await updateDoc(doc(fornecedorCollection, id), dataUpdate)
        .then(() => {
            validacao = true;
        })
        .catch((error) => {
            console.log(error);
        });

    return validacao;
}