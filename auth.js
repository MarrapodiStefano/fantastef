// FantaStef - Accesso Google
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "./firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const loginBtn = document.getElementById("googleLoginBtn");
const logoutBtn = document.getElementById("googleLogoutBtn");
const accountLabel = document.getElementById("accountLabel");

function aggiornaInterfaccia(user) {
  if (!loginBtn || !logoutBtn || !accountLabel) return;

  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-flex";
    accountLabel.style.display = "block";
    accountLabel.textContent = user.displayName || user.email || "Account Google";
  } else {
    loginBtn.style.display = "inline-flex";
    logoutBtn.style.display = "none";
    accountLabel.style.display = "none";
    accountLabel.textContent = "";
  }
}

async function verificaFirestore(user) {
  if (!user) return;

  try {
    // Test di sola lettura: non crea né modifica alcun dato.
    await getDoc(doc(db, "users", user.uid));
    alert("Test Firestore riuscito! L'account Google può accedere al proprio spazio.");
  } catch (error) {
    console.error("Errore test Firestore:", error);
    alert("Test Firestore non riuscito. Controlliamo prima di continuare.");
  }
}

async function accediConGoogle() {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Errore accesso Google:", error);
    alert("Accesso Google non riuscito. Riprova.");
  }
}

async function esciDaGoogle() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Errore uscita:", error);
    alert("Uscita dall'account non riuscita. Riprova.");
  }
}

if (loginBtn) {
  loginBtn.addEventListener("click", accediConGoogle);
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", esciDaGoogle);
}

onAuthStateChanged(auth, user => {
  aggiornaInterfaccia(user);
  if (user) {
    verificaFirestore(user);
  }
});
