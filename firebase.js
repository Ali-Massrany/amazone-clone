import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCLCrA0gB69ZHI2NXVpXQOlCpaikwGtwNM",
  authDomain: "fir-c0ae5.firebaseapp.com",
  projectId: "fir-c0ae5",
  storageBucket: "fir-c0ae5.appspot.com",
  messagingSenderId: "484642405726",
  appId: "1:484642405726:web:68c6463708bd8dfa4a23cf",
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export default app;
// export default db;
export { db };
