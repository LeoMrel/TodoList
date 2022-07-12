import { UserAuth } from "./Context/UserContext"
import { auth } from "../firebase";


const Dashboard = () => {
    const {logout} = UserAuth();

    console.log(auth.currentUser)
    return (
        <div className="bg-white p-10 rounded-lg dark:bg-gray-900">
        <div className="text-xl text-red-600">Hello world</div>
        <button onClick={logout} className="w-full border bg-blue-600 p-5">Logout</button>
        </div>
    )
}

export default Dashboard