import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import {auth} from '../../firebase'


const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true); 
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);

    const handleTheme = () => {
        const html = document.getElementsByTagName('html');
        if(!isDarkTheme) {
            setIsDarkTheme(true);
            localStorage.setItem('darkTheme', 'true');
            return html.item(0).setAttribute('class', 'dark')
        };

        setIsDarkTheme(false);
        localStorage.setItem('darkTheme', 'false');
        return html.item(0).setAttribute('class', 'white');
    };

    return(
        <UserContext.Provider value={{createUser, signIn, logout, handleTheme}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext) 
};