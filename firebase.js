// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { 
    getFirestore, //Sirve para traer la base de datos.
    collection, //Llama a la coleccion de datos. Todos los datos.
    addDoc, //Sirve para añadir un dato.
    getDocs, //Sirve para obtner datos/documentos/tareas. En plural.
    deleteDoc, //Sirve para borrar un documento.
    onSnapshot, //Sirve para escuchar en tiempo real.
    doc, //Llama a un solo dato de la base/coleccion de datos.
    getDoc, //Sirve para obtener un dato/documento/tarea. En singular.
    updateDoc //Sirve para actualizar un documento.
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ_qFCDMJIEJ2ED69T5P15EHlhRWwss60",
    authDomain: "fir-javascript-crud-80d61.firebaseapp.com",
    projectId: "fir-javascript-crud-80d61",
    storageBucket: "fir-javascript-crud-80d61.appspot.com",
    messagingSenderId: "897806855055",
    appId: "1:897806855055:web:e7fcdbfdfd71dac093f9fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//MIS FUNCIONES =====================================================================================

//Pasa una base de datos a la variable db
const db = getFirestore();

//AddDoc guarda los datos en firebase
export const saveTask = (title, description) => {
    addDoc(collection (db, 'tasks'), {title, description});
}

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTasks = (id) => deleteDoc(doc(db, 'tasks', id));

export const getTask = (id) => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);