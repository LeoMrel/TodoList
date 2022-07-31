
import { auth } from "../firebase";
import { UserAuth } from "./Context/UserContext";
import toggleTheme from '../icons/toggleTheme.png'
import signOut from '../icons/signOut.png'

const Navbar = () => {

    const { handleTheme, logout } = UserAuth();

    return (
        <div className="absolute flex w-full justify-end top-5 right-7">
            <div className="flex gap-7 whitespace-nowrap self-start">
                <div className={`group relative flex ${auth.currentUser ? 'place-content-center' : 'place-content-end'} dark:invert`}>
                <div onClick={handleTheme} className='dark:hover:rotate-45 hover:cursor-pointer hover:rotate-45 translate-all duration-200 rounded-sm dark:rotate-180'>
                    <img src={toggleTheme} width='30' height='30' alt='Change Theme' />
                </div>
                <div className='absolute top-10 opacity-0 bg-gray-100 px-2 font-semibold rounded-md group-hover:h-7 group-hover:min-w-9 group-hover:opacity-95 transition-all duration-200'> 
                                Change Theme 
                                </div>
                </div>
                {auth.currentUser &&
                    <button onClick={logout} className='group relative flex place-content-center dark:invert hover:translate-x-1 transition-all duration-200'>
                        <div className='absolute top-10 opacity-0 bg-gray-100 px-2 font-semibold rounded-md group-hover:h-7 group-hover:min-w-9 group-hover:opacity-95 transition-all duration-200'> 
                                Logout 
                                </div>
                        <img src={signOut} height='30' width='30' alt='Logout' />
                    </button>
                }
            </div>
        </div>
    )
}


export default Navbar