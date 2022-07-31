
const PasswordRequirements = ({password}) => {

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
};

export default PasswordRequirements