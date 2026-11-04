import { auth, db } from "./firebase.config.js";

import {
    setDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

let isAuthenticating = false;

// Check Authentication State
onAuthStateChanged(auth, (user) => {

    if (isAuthenticating) return;

    const isDashboard = window.location.pathname.endsWith(
        "/dashboard/dashboard.html"
    );

    if (user) {

        if (!isDashboard) {
            window.location.href = "../dashboard/dashboard.html";
        }

    } else {

        console.log("User is signed out");

        if (isDashboard) {
            window.location.href = "../login/login.html";
        }
    }
});


// Login Function
const login = (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.log(error.code, error.message);
            alert(error.message);
        });
};


// Register Function
const register = (e) => {
    e.preventDefault();

    isAuthenticating = true;

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    createUserWithEmailAndPassword(auth, email, password)

        .then(async (userCredential) => {

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                username: "",
                phone: "",
                uid: user.uid,
            });

            window.location.href = "../dashboard/dashboard.html";

        })

        .catch((error) => {
            console.log(error.code, error.message);
            alert(error.message);
            console.log("ERROR CODE:", error.code);
            console.log("ERROR MESSAGE:", error.message);
        })

        .finally(() => {
            isAuthenticating = false;
        });
};


// Logout Function
const logout = () => {
    signOut(auth)
        .catch((error) => {
            console.log(error.message);
        });
};


// Event Listeners
document.getElementById("login-form")
    ?.addEventListener("submit", login);

document.getElementById("register-form")
    ?.addEventListener("submit", register);

document.getElementById("logout")
    ?.addEventListener("click", logout);