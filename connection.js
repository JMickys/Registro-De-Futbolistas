import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import  { getFirestore, addDoc, collection, onSnapshot, deleteDoc, doc, getDoc, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCsyuWCKwK59t9I9yDdUdaKF_OtbWkQ8aQ",
  authDomain: "registro-futbol.firebaseapp.com",
  projectId: "registro-futbol",
  storageBucket: "registro-futbol.appspot.com",
  messagingSenderId: "807934688684",
  appId: "1:807934688684:web:8b7974623d4e21b2414e09"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()

export const guardar = async (nombre, equipo, pais, edad, fecha, posicion, pie, estado) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'futbolista'), where('nombre', '==', nombre)));
        if (!querySnapshot.empty) {
            Swal.fire({
                title: 'El jugador '+ nombre +' ya fue ingresado anteriormente',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            return '';
        }
        const docRef = await addDoc(collection(db, 'futbolista'), {
            nombre,
            equipo,
            pais,
            edad,
            fecha,
            posicion,
            pie,
            estado
        });
        return docRef.id;
    } catch (error) {
        console.error("Error al guardar el registro:", error);
        return '';
    }
}

export const listar = (datos) =>{
    onSnapshot(collection(db, 'futbolista'), datos)
  }
  
  export const eliminar = (id) => {
      deleteDoc(doc(db, 'futbolista', id))
  }
  
  export const buscarId = (id) => getDoc(doc(db, 'futbolista', id))
  
  export const modificar = (id, registro) => {
      updateDoc(doc(db, 'futbolista', id), registro)
  }
