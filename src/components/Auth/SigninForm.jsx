import { useRef, useState } from "react";
import { browserSessionPersistence, setPersistence, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { Link } from 'react-router-dom';
import { UserAuth } from "../Context/UserContext";
import { emailRegex } from "./validationRegex";
import ErrorMessage from "./ErrorMessage";
import * as Styles from '../Styles/CardStyles';
import show from '../../icons/show.png'
import hide from '../../icons/hide.png';
import GoogleButton from "./GoogleAuth";

const SigninForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const { signIn } = UserAuth();

    const email = useRef();
    const password = useRef();
    const [seePassword, setSeePassword] = useState(false);

    const [error, setError] = useState(null);

    const handleSignin = async e => {
        e.preventDefault();
        setIsLoading(true);
        if (!rememberMe) setPersistence(auth, browserSessionPersistence);

        const emailRef = email.current.value;
        const passwordRef = password.current.value;

        try {

            await signIn(emailRef, passwordRef);

        } catch (error) {
            const message = error.message;

            setTimeout(() => {

                if (!emailRef.match(emailRegex)) setError('Invalid email');
                else if (message.includes('user')) setError('User not found');
                else if (message.includes('password')) setError('Invalid password');

                setIsLoading(false)
            }, 1000);
        }
    };

    const handleRememberMe = () => setRememberMe(!rememberMe);
    const handleGoogleSignIn = async () => await signInWithPopup(auth, googleProvider);

    return (
        <div className={Styles.cardStyles}>
            <form onSubmit={handleSignin} className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to your Todo list</h5>
                <div className="flex flex-col gap-3">
                    {error && <ErrorMessage error={error} />}
                    <input
                        ref={email}
                        type="email"
                        name="email"
                        id="email"
                        className={Styles.inputStyles}
                        placeholder="Email"
                        required />
                    <div className="relative flex place-items-center">
                        <input
                            ref={password}
                            type={seePassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className={Styles.inputStyles}
                            placeholder="Password"
                            required />

                        <div onClick={() => setSeePassword(!seePassword)}
                            className={Styles.seePasswordStyles}>
                            <img src={seePassword ? show : hide} alt={'show/hide password'} height='25' width='25' />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full px-2">
                    <div className="flex flex-col gap-2 items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onChange={handleRememberMe} id="remember" type="checkbox" checked={rememberMe} className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                            </div>
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <Link to='/reset' className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</Link>
                    </div>
                    <button disabled={isLoading} type="submit" className={Styles.buttonStyles}>{isLoading ? Styles.loadingIcon : 'Sign in to your account'}</button>
                    <GoogleButton handleGoogleSignIn={handleGoogleSignIn} />
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default SigninForm