import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCqb34O9z-KOXJz-chjvPy10R52AZoeQJ4",
  authDomain: "cp2-mobile-oldlady.firebaseapp.com",
  databaseURL: "https://cp2-mobile-oldlady-default-rtdb.firebaseio.com",
  projectId: "cp2-mobile-oldlady",
  storageBucket: "cp2-mobile-oldlady.appspot.com",
  messagingSenderId: "298260743575",
  appId: "1:298260743575:web:fe4ebc40ec503788e4b0d2",
  measurementId: "G-3G2J7C8314"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);