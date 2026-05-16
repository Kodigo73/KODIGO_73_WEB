import { db } from "./firebase-config.js";
import {
  collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const FB = {
  async getAll(col) {
    const snap = await getDocs(collection(db, col));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async get(col, id) {
    const snap = await getDoc(doc(db, col, id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },
  async set(col, id, data) {
    return await setDoc(doc(db, col, id), data);
  },
  async add(col, data) {
    return await addDoc(collection(db, col), data);
  },
  async eliminar(col, id) {
    return await deleteDoc(doc(db, col, id));
  }
};
