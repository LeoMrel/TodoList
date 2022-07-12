import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from "./Context/UserContext";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebase";

const Card = ({ isSignUp }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false)
    const navigateTo = useNavigate();
    const {createUser, signIn} = UserAuth();

    const email = useRef(null);
    const password = useRef(null);
    const repeatPassword = useRef(null);

    const handleRememberMe = () => rememberMe === false ? setRememberMe(true) : setRememberMe(false)

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

    const inputStyles = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    const buttonStyles = "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"


    const displayIfIsSignup = 
        <div className="p-4 w-11/12 md:w-2/4 md:p-10 bg-white rounded-lg border border-gray-200 shadow-2xl dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSignup} className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign up for a free account</h5>
                    <div className="flex flex-col gap-3">
                    <input ref={email} type="email" name="email" id="email" className={inputStyles} placeholder="Email or phone number" required />
                    <input ref={password} type="password" name="password" id="password" className={inputStyles} placeholder="Password"  required />
                    <input ref={repeatPassword} type="password" name="password" id="password" placeholder="Repeat Password" className={inputStyles} required />
                    </div>
                <div className="flex flex-col gap-5 w-full">
                    <button disabled={isLoading ? true : false} type="submit" className={buttonStyles}>Sign up</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account? <Link to="/" className="text-blue-700 hover:underline dark:text-blue-500">Try login in!</Link>
                    </div>
                </div>
            </form>
        </div>

    const displayIfIsSignin = (
        <div className="p-4 w-11/12 md:w-2/4 md:p-10 bg-white rounded-lg border border-gray-200 shadow-2xl dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSignin} className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to your Todo list</h5>
                <div className="flex flex-col gap-3">
                    <input ref={email} type="email" name="email" id="email" className={inputStyles} placeholder="Email or phone number" required />
                    <input ref={password} type="password" name="password" id="password" className={inputStyles} placeholder="Password"  required />
                    </div>
                <div className="flex flex-col gap-5 w-full px-2">
                    <div className="flex flex-col gap-2 items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onClick={handleRememberMe} id="remember" type="checkbox" value="false" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                            </div>
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <Link to='/reset' className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</Link>
                    </div>
                    <button type="submit" className={buttonStyles}>Sign in to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                    </div>
                </div>
            </form>
        </div>
    )


    return isSignUp ? displayIfIsSignup : displayIfIsSignin 

}

export default Card