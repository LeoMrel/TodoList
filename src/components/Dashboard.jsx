import { UserAuth } from "./Context/UserContext";
import {doc, getDoc, onSnapshot} from 'firebase/firestore';
import { firestore } from "../firebase";
import { useEffect, useState } from "react";



const Dashboard = ({props}) => {
    const [todoList, setTodoList] = useState([]);
    const {logout} = UserAuth();
    const user = props;

    console.log(user.uid);

    return (
        <div className="bg-white p-10 rounded-lg dark:bg-gray-900">
        <div className="text-xl text-red-600">Hello world</div>
        <button onClick={logout} className="w-full border bg-blue-600 p-5">Logout</button>
        </div>
    )
}

export default Dashboard