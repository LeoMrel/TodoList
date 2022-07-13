import { createContext, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import {auth} from '../../firebase'


const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => {
        localStorage.removeItem('qqiud');
        return signOut(auth)
    };

    return(
        <UserContext.Provider value={{createUser, signIn, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext) 
};