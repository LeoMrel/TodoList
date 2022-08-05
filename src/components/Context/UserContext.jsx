import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { auth } from '../../firebase'


const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false); 
   
    useEffect(() => {
     const storedPreference = (localStorage.getItem('prefersDarkMode'));
     if (storedPreference === 'true') setIsDarkTheme(JSON.parse(storedPreference));
   }, []);
     
   useEffect(() => {
     const html = document.getElementsByTagName('html').item(0)
     if (isDarkTheme) {
       localStorage.setItem('prefersDarkMode', 'true');
       html.classList.add('dark');
     }
     else {
       localStorage.setItem('prefersDarkMode', 'false');
       html.classList.remove('dark');
     }
   }, [isDarkTheme]);
   
    const handleTheme = () => setIsDarkTheme(!isDarkTheme);
   
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => {
        localStorage.removeItem('qqiud');
        return signOut(auth)
    };

    const resetPassword = (email) => {
      return sendPasswordResetEmail(auth, email)
    }

    return(
        <UserContext.Provider value={{createUser, signIn, logout, resetPassword, handleTheme }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext) 
};