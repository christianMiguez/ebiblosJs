import {createStore, combineReducers, compose} from 'redux';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase'
import {reduxFirestore, firestoreReducer} from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

/** custom reducers **/
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer'

// Configuración de Firestore
const firebaseConfig = {
  apiKey: "AIzaSyBUdHaxwvAjxqx72duhFcLWcVYa115EUQY",
  authDomain: "ebiblos-f0b88.firebaseapp.com",
  databaseURL: "https://ebiblos-f0b88.firebaseio.com",
  projectId: "ebiblos-f0b88",
  storageBucket: "",
  messagingSenderId: "223406644104",
  appId: "1:223406644104:web:25f414a047c29ecc"
};

// Iniciar Firebase
firebase.initializeApp(firebaseConfig)

// configuracion de react-redux
const rrConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

// crear el enhancer con compose y firestore
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrConfig),
  reduxFirestore(firebase)
)(createStore)

// Reducers

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  usuario: buscarUsuarioReducer
})

// state inicial
const initialState = {}

// Crear store

const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
