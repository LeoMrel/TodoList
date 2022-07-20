import React from "react";
import { auth } from "../firebase";
import { UserAuth } from "./Context/UserContext";
import { buttonStyles } from "./Styles/CardStyles";


const Container = ({ children }) => {
    const {handleTheme, logout} = UserAuth();

    return (
        <div className="flex place-content-center bg-gray-300 dark:bg-gray-800 duration-200">
            <div className="container relative flex flex-col place-content-center min-h-screen h-full w-full">
                <div className="absolute flex w-full justify-end top-5 right-5">
                    <div className="flex gap-5 whitespace-nowrap self-start">
                <button onClick={handleTheme} className={buttonStyles}>Change Theme</button>
                {auth.currentUser && <button onClick={logout} className={buttonStyles}>Logout</button>}
                </div>
                </div>
                <div className="flex w-full justify-center mt-20 place-items-center">
                {children}
            </div>
            </div>
        </div>
    )
}


export default Container