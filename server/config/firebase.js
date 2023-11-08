import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/config.env",
});

const firebaseConfig = {
  apiKey: process.env.FBAPIKEY,
  authDomain: process.env.FBAUTHDOMAIN,
  projectId: process.env.FBPROJECTID,
  storageBucket: process.env.FBSTORAGEBUCKET,
  messagingSenderId: process.env.FBMESSAGINGSENDERID,
  appId: process.env.FBAPPID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
