import { buttonStyles } from '../Styles/Styles'
import google from '../../icons/google.png';

const GoogleButton = ({ handleGoogleSignIn }) => {

    return (
        <div className="flex relative w-full group">
            <div className="absolute place-self-center flex bg-white group-hover:bg-gray-100 w-1/12 h-full rounded-tl-md rounded-bl-md" >
                <img src={google} height='30' width='30' alt='Sign in with Google' className='block m-auto place-self-center' />
            </div>
            <button onClick={handleGoogleSignIn} className={buttonStyles}>Sign in with Google</button>
        </div>
    )
}

export default GoogleButton