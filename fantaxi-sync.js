// FantaStef - Sincronizzazione FantaXI con Firebase
// Durante questa fase localStorage resta la copia locale di sicurezza.
// Firestore diventa la copia sincronizzata dell'utente autenticato.

import { auth, db, onAuthStateChanged } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const COLLECTION = "fantaxi";

let utenteFantaXI = null;
let sincronizzazioneInCorso = false;
let datiInAttesa = null;

function riferimentoFantaXI(user) {
  return doc(db, "users", user.uid, COLLECTION, "data");
}

async function salvaSuFirestore(dati) {
  if (!utenteFantaXI) return;

  if (sincronizzazioneInCorso) {
    datiInAttesa = dati;
    return;
  }

  try {
    // Firestore non accetta valori undefined.
    // Usiamo la stessa serializzazione già usata da localStorage,
    // così i dati inviati al cloud sono identici a quelli locali.
    const datiPuliti = JSON.parse(JSON.stringify(dati));

    await setDoc(riferimentoFantaXI(utenteFantaXI), {
      dati: datiPuliti,
      updatedAt: serverTimestamp()
    });

    console.log("FantaXI: dati salvati su Firestore.");
  } catch (error) {
    console.error("FantaXI: errore salvataggio Firestore:", error);
  }
}

async function sincronizzaFantaXI(user) {
  utenteFantaXI = user || null;

  if (!user) return;

  const riferimento = riferimentoFantaXI(user);

  try {
    sincronizzazioneInCorso = true;

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
  } finally {
    sincronizzazioneInCorso = false;

    // Se durante la sincronizzazione l'utente ha modificato la rosa,
    // salviamo subito anche l'ultima versione locale.
    if (datiInAttesa) {
      const datiDaSalvare = datiInAttesa;
      datiInAttesa = null;
      await salvaSuFirestore(datiDaSalvare);
    }
  }
}

// Ogni volta che FantaXI chiama salvaDati(), aggiorniamo anche Firestore.
window.addEventListener("fantaXIDataChanged", function(event) {
  salvaSuFirestore(event.detail);
});

onAuthStateChanged(auth, sincronizzaFantaXI);
