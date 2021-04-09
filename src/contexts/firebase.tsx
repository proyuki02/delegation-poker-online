import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const env = process.env;

const firebaseConfig = {
  apiKey: env.REACT_APP_API_KEY,
  authDomain: env.REACT_APP_AUTH_DOMAIN,
  projectId: env.REACT_APP_PROJECT_ID,
  storageBucket: env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_APP_ID,
  measurementId: env.REACT_APP_MEASUREMENT_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();

const defaultState = {
  user: auth.currentUser,
  loaded: false,
  error: "",
  db,
  auth,
};

export const FirebaseContext = createContext(defaultState);

export function FirebaseProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState(defaultState.user);
  const [loaded, setLoaded] = useState(defaultState.loaded);
  const [error, setError] = useState(defaultState.error);

  useEffect(() => {
    console.log("useEffect");
    auth.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged");
      const allowDomain = process.env.REACT_APP_ALLOW_DOMAIN || "";

      if (user) {
        if (user.email && user.email.endsWith(allowDomain)) {
          setUser(user);
        } else {
          setError("認証に失敗しました");
          auth.signOut();
        }
        console.log("user", user);
        setLoaded(true);
      } else {
        const lookup = () => {
          const icon = document.querySelector(".firebaseui-idp-icon");
          console.log("lookup firebaseui-idp-icon", icon);
          if (icon) {
            setLoaded(true);
          } else {
            setTimeout(lookup, 200);
          }
        };
        setTimeout(lookup, 200);
      }
    });
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, loaded, error, db, auth }}>
      {props.children}
    </FirebaseContext.Provider>
  );
}
