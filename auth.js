// FantaStef - Accesso Google
import {
  auth,
  googleProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from "./firebase.js";

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

async function accediConGoogle() {
  try {
    // Su iPhone evitiamo il popup: Firebase porta avanti il login
    // e poi torna automaticamente alla stessa home-app.
    await signInWithRedirect(auth, googleProvider);
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

onAuthStateChanged(auth, aggiornaInterfaccia);
