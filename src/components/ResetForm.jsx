import * as Styles from './Styles/CardStyles'
import { Link } from 'react-router-dom';

const ResetForm = () => {

    return (
        <div className={Styles.cardStyles}>
            <h5  className="text-xl font-medium text-gray-900 dark:text-white">Reset your password</h5>
            <input className={`mb-5 mt-2 ${Styles.inputStyles}`} placeholder='Email Adress'></input>
            <Link to='/' className="ml-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-500">
                Go back to login
            </Link>
        </div>
    )
}

export default ResetForm