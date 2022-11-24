import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../../Firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthPrivider = ({children}) => {
  const [user, setUser] = useState(null);

  const googleSignIn = (provider) =>{
    return signInWithPopup(auth, provider);
  }

  const createUser = (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUser = (profile) =>{
    return updateProfile(auth.currentUser, profile);
  }

  const userLogIn = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () =>{
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
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