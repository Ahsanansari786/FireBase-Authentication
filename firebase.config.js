import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDsLkoioxohzQ-22RXpliA8SKHTe9MpBs4",
    authDomain: "fir-assignment-f9733.firebaseapp.com",
    projectId: "fir-assignment-f9733",
    storageBucket: "fir-assignment-f9733.firebasestorage.app",
    messagingSenderId: "843297081503",
    appId: "1:843297081503:web:bee7afa98f88794692baaa",
    measurementId: "G-31FN2N5VWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);