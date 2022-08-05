import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { UserAuth } from './Context/UserContext';
import * as Styles from './Styles/Styles'
import ErrorMessage from './Auth/ErrorMessage';

const ResetForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const { resetPassword } = UserAuth();
    const email = useRef(null);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        const emailRef = email.current.value;

        if (emailRef) {
            try {
                await resetPassword(emailRef).then(() => { setIsLoading(false); setSuccess(true) });
            } catch (error) {
                const message = error.message;

                setTimeout(() => {
                    if (message.includes('invalid')) setError('Invalid email');
                    if (message.includes('user')) setError('User not found');
                    setIsLoading(false);
                }, 1000);
            }
        }
    }

    const resetForm =
        <div className={Styles.cardStyles}>
            <h5 className="text-xl mb-2 font-medium text-gray-900 dark:text-white">Reset your password</h5>
            {error && <ErrorMessage error={error} />}
            <form onSubmit={handleSubmit} className='mb-5 flex flex-col gap-5'>
                <input ref={email} className={Styles.inputStyles} placeholder='Email Adress'></input>
                <button type='submit' className={Styles.buttonStyles}>
                    {isLoading ? Styles.loadingIcon : 'Submit'}
                </button>
            </form>
            <Link to='/' className="ml-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-500">
                Go back to login
            </Link>
        </div>

    const displayIfSuccess =
        <div className={Styles.cardStyles}>
            <div className='flex flex-col text-gray-900 dark:text-white gap-y-2 mb-3'>
                <h5 className="text-xl font-medium">We've send you a reset email</h5>
                <p>Please check your <a className='ml-1 text-blue-700 hover:underline dark:text-blue-500' href='https://www.gmail.com/#spam' rel='noreferrer' target='_blank'>spam folder</a></p>
                <a href='https://www.gmail.com' rel='noreferrer' target='_blank' className={`${ Styles.buttonStyles } w-1/4`}>
                    Open Gmail
                </a>
            </div>
            <Link to='/' className="ml-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-500">
                Go back to login
            </Link>
        </div>

    return success ? displayIfSuccess : resetForm

}

export default ResetForm