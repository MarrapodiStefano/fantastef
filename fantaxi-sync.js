// FantaStef - Sincronizzazione FantaXI con Firebase
// La rosa locale resta intatta durante i test.
// Se l'utente è autenticato:
// - se esiste una rosa su Firestore, viene recuperata;
// - se non esiste, la rosa locale viene migrata su Firestore.

import { auth, db, onAuthStateChanged } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const COLLECTION = "fantaxi";

async function sincronizzaFantaXI(user) {
  if (!user) return;

  const riferimento = doc(db, "users", user.uid, COLLECTION, "data");

  try {
    const cloudSnapshot = await getDoc(riferimento);
    const localeRaw = localStorage.getItem("fantaXI");

    if (cloudSnapshot.exists()) {
      const cloudData = cloudSnapshot.data();

      if (cloudData.dati) {
        localStorage.setItem("fantaXI", JSON.stringify(cloudData.dati));

        if (typeof aggiornaSelectRose === "function") aggiornaSelectRose();
        if (typeof aggiornaBoxRosa === "function") aggiornaBoxRosa();

        console.log("FantaXI: rosa recuperata da Firestore.");
      }

      return;
    }

    if (localeRaw) {
      const datiLocali = JSON.parse(localeRaw);

      await setDoc(riferimento, {
        dati: datiLocali,
        updatedAt: serverTimestamp()
      });

      console.log("FantaXI: rosa locale migrata su Firestore.");
    }
  } catch (error) {
    console.error("FantaXI: errore sincronizzazione:", error);
  }
}

onAuthStateChanged(auth, sincronizzaFantaXI);
