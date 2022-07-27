export const cardStyles = "p-4 w-11/12 md:w-5/12 md:p-10 rounded-lg border border-gray-400 bg-white shadow-2xl dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200"
export const inputStyles = "bg-gray-50 focus:outline-none border text-gray-900 text-sm rounded-lg block w-full p-3.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors duration-200"
export const buttonStyles = "w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
export const seePasswordStyles = "h-3/4 w-20 rounded-md absolute right-0 place-items-center place-content-center flex z-1 hover:cursor-pointer"
export const loadingIcon = <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" />


export const PasswordRequirements = ({password}) => {

    const containsNumber = /\d/.test(password);
    const containsUpperCase = /(?=.*[A-Z])/.test(password);
    const containsLowerCase = /(?=.*[a-z])/.test(password);
    const containsLength = password.length >= 6;

    return (
        <div className="bg-gray-200 rounded-md container my-1 px-2 py-1 dark:bg-gray-800 dark:text-white transition-colors relative">
            <div className="h-4 w-10 rotate-45 rounded-sm bg-gray-200 dark:bg-gray-800 transition-colors absolute" />
            <h5 className="z-1 transform">Password must:</h5>
            <div className="px-2">
                <div className={`${containsLength ? 'text-green-500' : 'text-red-500'} flex gap-1`}>
                <i> {containsLength ? '✓' : 'x'} </i>
                <p>Be 6 characters long</p> 
                </div>
                <div className={`${containsUpperCase ? 'text-green-500' : 'text-red-500'} flex gap-1`}>
                <i> {containsUpperCase ? '✓' : 'x'} </i>
                <p>Contain at least one upper case character</p> 
                </div>
                <div className={`${containsLowerCase ? 'text-green-500' : 'text-red-500'} flex gap-1`}>
                <i> {containsLowerCase ? '✓' : 'x'} </i>
                <p>Contain at least one lower case character</p>
                </div>
                <div className={`${containsNumber ? 'text-green-500' : 'text-red-500'} flex gap-1`}>
                <i> {containsNumber ? '✓' : 'x'} </i>
                <p>Contain at least one number</p> 
                </div>
            </div>
        </div>
    )
}