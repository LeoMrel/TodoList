import React from "react";
import Navbar from "../Navbar";


const Container = ({ children }) => {
    return (
        <div className="flex place-content-center bg-gray-300 dark:bg-gray-800 duration-200">
            <div className="container relative flex flex-col place-content-center min-h-screen h-full w-full">
                <Navbar />
                <div className="flex w-full justify-center mt-20 place-items-center">
                    {children}
                </div>
            </div>
            <div className="absolute text-sm font-semibold bottom-5 right-5 dark:text-white opacity-60">
                Icons by
                <a className="ml-1 text-blue-700 hover:underline dark:text-blue-500"
                    href='https://icons8.com'
                    target='_blank'
                    rel='noreferrer'
                >
                    Icons8
                </a>
            </div>
        </div>
    )
}


export default Container