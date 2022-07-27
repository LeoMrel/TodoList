
import { auth } from "../firebase";
import { UserAuth } from "./Context/UserContext";
import toggleTheme from '../icons/toggleTheme.png'
import signOut from '../icons/signOut.png'
//import { buttonStyles } from "./Styles/CardStyles";

const Navbar = () => {

    const { handleTheme, logout } = UserAuth();

    return (
        <div className="absolute flex w-full justify-end top-5 right-5">
            <div className="flex gap-5 whitespace-nowrap self-start">
                <div onClick={handleTheme} className='dark:hover:invert translate-all duration-200 rounded-sm hover:cursor-pointer dark:rotate-180'>
                    <img src={toggleTheme} width='30' height='30' alt='Change Theme' />
                </div>
                {auth.currentUser &&
                    <button onClick={logout} className='dark:hover:invert transition-colors duration-200'>
                        <img src={signOut} height='30' width='30' alt='Logout' />
                    </button>
                }
            </div>
        </div>
    )
}


export default Navbar