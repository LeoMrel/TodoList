import React from "react";


const Container = ({ children }) => {
    return (
        <div className="container flex mx-auto w-screen place-content-center">
            <div className="flex place-items-center h-screen w-3/4 place-content-center bg-gray-900">
                {children}
            </div>
        </div>
    )
}


export default Container