import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../../Firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthPrivider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = (provider) =>{
    setLoading(true);
    return signInWithPopup(auth, provider);
  }

  const createUser = (email, password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUser = (profile) =>{
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  }

  const userLogIn = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () =>{
    setLoading(true);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
      setLoading(false);
      setUser(currentUser);
    })

    return () => unsubscribe();
  }, [])

  const authInfo = {
    user,
    setUser,
    googleSignIn,
    createUser,
    updateUser,
    userLogIn,
    logOut
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthPrivider;