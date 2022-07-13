import React from "react";
import { UserAuth } from "./Context/UserContext";


const Container = ({ children }) => {
    const {handleTheme} = UserAuth();

    return (
        <div className="container flex mx-auto w-screen place-content-center">
            <div className={`relative flex place-items-center h-screen w-full place-content-center bg-gray-300 dark:bg-gray-800 duration-200`}>
                <button onClick={handleTheme} className="absolute text-white right-5 top-5 border border-blue-900 p-5 bg-blue-900">Change Theme</button>
                {children}
            </div>
        </div>
    )
}


export default Container