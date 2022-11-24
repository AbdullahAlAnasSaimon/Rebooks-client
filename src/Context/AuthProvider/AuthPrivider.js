import React, { createContext } from 'react';
import {getAuth} from 'firebase/auth';
import app from '../../Firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthPrivider = ({children}) => {
  const user = {name: 'user'}

  const authInfo = {user};

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthPrivider;