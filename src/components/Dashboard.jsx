import { UserAuth } from "./Context/UserContext"


const Dashboard = () => {
    const {logout} = UserAuth();

    return (
        <div>
        <div className="text-xl text-red-600">Hello world</div>
        <button onClick={logout} className="w-full border bg-blue-600 p-5">Logout</button>
        </div>
    )
}

export default Dashboard