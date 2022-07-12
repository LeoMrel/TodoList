import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from "./Context/UserContext";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebase";
import * as Styles from './Styles/CardStyles'

const Card = ({ isSignUp }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
   
    const navigateTo = useNavigate();
    const {createUser, signIn} = UserAuth();

    const email = useRef(null);
    const password = useRef(null);
    const repeatPassword = useRef(null);


    const handleSignup = async e => {
        e.preventDefault();
        setIsLoading(true);
        
        if(password.current.value === repeatPassword.current.value) {
            try{
            setIsLoading(false);
            await createUser(email.current.value, password.current.value);
            navigateTo('/');
            } catch(error) {
                console.log(error)
            }
        };
    }

    const handleRememberMe = () => rememberMe === true ? setRememberMe(false) : setRememberMe(true)

    const handleSignin = async e => {
        e.preventDefault();
        setIsLoading(true);
        if(!rememberMe) setPersistence(auth, browserSessionPersistence);
        try {            
            await signIn(email.current.value, password.current.value)
        } catch(error) {
            console.log(error)
        }
    }

    const displayIfIsSignup = 
        <div className={Styles.cardStyles}>
            <form onSubmit={handleSignup} className="space-y-6" action="#">
                <h5 className={`text-xl font-medium text-gray-900 dark:text-white`}>Sign up for a free account</h5>
                    <div className="flex flex-col gap-3">
                    <input ref={email} type="email" name="email" id="email" className={Styles.inputStyles} placeholder="Email or phone number" required />
                    <input ref={password} type="password" name="password" id="password" className={Styles.inputStyles} placeholder="Password"  required />
                    <input ref={repeatPassword} type="password" name="password" id="password" placeholder="Repeat Password" className={Styles.inputStyles} required />
                    </div>
                <div className="flex flex-col gap-5 w-full">
                    <button disabled={isLoading} type="submit" className={Styles.buttonStyles}>Sign up</button>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Already have an account? <Link to="/" className="text-blue-700 hover:underline dark:text-blue-500">Try login in!</Link>
                    </div>
                </div>
            </form>
        </div>

    const displayIfIsSignin = (
        <div className={Styles.cardStyles}>
            <form onSubmit={handleSignin} className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to your Todo list</h5>
                <div className="flex flex-col gap-3">
                    <input ref={email} type="email" name="email" id="email" className={Styles.inputStyles} placeholder="Email or phone number" required />
                    <input ref={password} type="password" name="password" id="password" className={Styles.inputStyles} placeholder="Password"  required />
                    </div>
                <div className="flex flex-col gap-5 w-full px-2">
                    <div className="flex flex-col gap-2 items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onChange={handleRememberMe} id="remember" type="checkbox" checked className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                            </div>
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <Link to='/reset' className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</Link>
                    </div>
                    <button disabled={isLoading} type="submit" className={Styles.buttonStyles}>Sign in to your account</button>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                    </div>
                </div>
            </form>
        </div>
    )


    return isSignUp ? displayIfIsSignup : displayIfIsSignin 

}

export default Card