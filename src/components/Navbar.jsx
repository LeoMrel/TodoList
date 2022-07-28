
import { auth } from "../firebase";
import { UserAuth } from "./Context/UserContext";
import toggleTheme from '../icons/toggleTheme.png'
import signOut from '../icons/signOut.png'

const Navbar = () => {

    const { handleTheme, logout } = UserAuth();

    return (
        <div className="absolute flex w-full justify-end top-5 right-5">
            <div className="flex gap-5 whitespace-nowrap self-start">
                <div onClick={handleTheme} className='dark:hover:invert hover:cursor-pointer hover:rotate-45 translate-all duration-200 rounded-sm dark:rotate-180'>
                    <img src={toggleTheme} width='30' height='30' alt='Change Theme' />
                </div>
                {auth.currentUser &&
                    <button onClick={logout} className='dark:hover:invert hover:translate-x-1 transition-all duration-200'>
                        <img src={signOut} height='30' width='30' alt='Logout' />
                    </button>
                }
            </div>
        </div>
    )
}


export default Navbar