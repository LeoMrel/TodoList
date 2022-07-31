import { useState } from 'react';
import { UserAuth } from '../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom'
import PasswordRequirements from './PasswordRequirements';
import * as Styles from '../Styles/CardStyles';
import show from '../../icons/show.png';
import hide from '../../icons/hide.png';
import ErrorMessage from './ErrorMessage';
import { emailRegex, passwordRegex } from './validationRegex';

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigateTo = useNavigate();
    const { createUser } = UserAuth();

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [displayPasswordRequirements, setDisplayPasswordRequirements] = useState(false);

    const [repeatPassword, setRepeatPassword] = useState('');
    const [seeRepeatPassword, setSeeRepeatPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const [error, setError] = useState(null);

    const dynamicEmailStyles = email === '' ? 'dark:border-gray-500 border-gray-300'
        : isValidEmail ? 'focus:outline-green-500 border-green-500'
            : 'focus:outline-red-500 border-red-500';

    const dynamicPasswordStyles = password === '' ? 'dark:border-gray-500 border-gray-300'
        : isValidPassword ? 'focus:outline-green-500 border-green-500'
            : 'focus:outline-red-500 border-red-500';


    const dynamicRepeatPasswordStyles = repeatPassword === '' ? 'dark:border-gray-500 border-gray-300'  
        : passwordsMatch ? 'focus:outline-green-500 border-green-500'
        : 'focus:outline-red-500 border-red-500'


    const handleSignup = async e => {
        e.preventDefault();
        setIsLoading(true);

        if(!isValidPassword) {
            return setTimeout(() => {
                setError('Invalid password');
                setPasswordsMatch(false);
                setIsLoading(false);
            }, 1000)
        };
        if(!passwordsMatch) {
            return setTimeout(() => {
                setError('Passwords must match');
                setIsLoading(false);
            }, 1000)
        };

        if (passwordsMatch) {
            try {
                await createUser(email, password);
                navigateTo('/');
            } catch (error) {
                const message = error.message;
                setTimeout(() => {   
                if(message.includes('email')) {
                    setIsValidEmail(false);
                    message.includes('in-use') ? setError('Email already exists') : setError('Invalid email');
                };
                if(message.includes('password')) {
                    setIsValidPassword(false);
                    setError('Invalid password')
                };
                
                setIsLoading(false)
                }, 1000);
            }
        };
    }

    return (
        <div className={Styles.cardStyles}>
            <form onSubmit={handleSignup} className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign up for a free account</h5>
                <div className="flex flex-col gap-3">
                    {error && <ErrorMessage error={error} />}
                    <input
                        onChange={e => {
                            const emailRef = e.target.value;
                            setEmail(emailRef);
                            Boolean(emailRef.match(emailRegex)) ? setIsValidEmail(true) : setIsValidEmail(false);
                        }}
                        type="email"
                        name="email"
                        id="email"
                        className={`${ Styles.inputStyles } ${ dynamicEmailStyles }`}
                        placeholder="Email"
                        required />
                    <div className="relative flex place-items-center">
                        <input
                            onFocus={() => setDisplayPasswordRequirements(true)}
                            onBlur={() => setDisplayPasswordRequirements(false)}
                            onChange={(e) => {
                                const passwordRef = e.target.value;
                                setPassword(passwordRef);
                                Boolean(passwordRef.match(passwordRegex)) ? setIsValidPassword(true) : setIsValidPassword(false);
                                repeatPassword === passwordRef ? setPasswordsMatch(true) : setPasswordsMatch(false);
                            }}
                            type={seePassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className={`${ Styles.inputStyles } ${ dynamicPasswordStyles } z-0`} placeholder="Password"
                            required />
                        <div onClick={() => setSeePassword(!seePassword)}
                            className={Styles.seePasswordStyles}>
                            <img src={seePassword ? show : hide} alt={'show/hide password'} height='25' width='25' />
                        </div>
                    </div>
                    {displayPasswordRequirements && <PasswordRequirements password={password} />}
                    <div className="relative flex place-items-center">
                        <input
                            onChange={(e) => {
                                const repeatPasswordRef = e.target.value;
                                setRepeatPassword(repeatPasswordRef);
                                repeatPasswordRef === password ? setPasswordsMatch(true) : setPasswordsMatch(false);
                            }}
                            type={seeRepeatPassword ? 'text' : 'password'}
                            name="Repeat_password"
                            id="Repeat_password"
                            placeholder="Repeat Password"
                            className={`${ Styles.inputStyles } ${ dynamicRepeatPasswordStyles }`}
                            required />
                        <div onClick={() => setSeeRepeatPassword(!seeRepeatPassword)}
                            className={Styles.seePasswordStyles}>
                            <img src={seeRepeatPassword ? show : hide} alt={'show/hide password'} height='25' width='25' />
                        </div>

                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <button disabled={isLoading} type="submit" className={Styles.buttonStyles}> {isLoading ? Styles.loadingIcon : 'Sign Up'} </button>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Already have an account? <Link to="/" className="text-blue-700 hover:underline dark:text-blue-500">Try login in!</Link>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default SignupForm