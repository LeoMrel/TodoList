import React from "react";
import Navbar from "./Navbar";


const Container = ({ children }) => {
    return (
        <div className="flex place-content-center bg-gray-300 dark:bg-gray-800 duration-200">
            <div className="container relative flex flex-col place-content-center min-h-screen h-full w-full">
                <Navbar />
                <div className="flex w-full justify-center mt-20 place-items-center">
                {children}
            </div>
            </div>
        </div>
    )
}


export default Container