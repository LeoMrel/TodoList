import { UserAuth } from "./Context/UserContext";
import { collection, addDoc, serverTimestamp, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from "../firebase";
import { useRef } from "react";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { PhoneAuthProvider } from "firebase/auth";
import { buttonStyles } from "./Styles/CardStyles";
import { uuidv4 } from "@firebase/util";

const Dashboard = ({ props }) => {
    const user = props;
    const { logout } = UserAuth();
    const todoItem = useRef(null);
    const pathRef = collection(firestore, `users/${user.uid}/todos`)
    const [todos] = useCollectionData(pathRef);

    const handleSubmit = async e => {
        e.preventDefault();
        const text = todoItem.current.value;
        const id = uuidv4();
        const input = document.getElementById('inputField');

        if(text) {
            try {
                input.value = "";
                await setDoc(doc(pathRef, id) , {
                    id,
                    text,
                    completed: false,
                    createdAt: serverTimestamp(),
                });
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }
    };

    const handleDelete = (id) => deleteDoc(doc(pathRef, id));


    return (
        <div className="bg-white p-10 rounded-lg dark:bg-gray-900 my-5">
            <div className="text-xl text-red-600">Hello world</div>
            <div className="flex gap-5 m-2">
                <input id={'inputField'} ref={todoItem} type='text' placeholder="write a todo" className="px-5" />
                <button
                    className="p-5 bg-blue-600 text-white dark:text-black border boder-white"
                    type="submit"
                    onClick={handleSubmit}>
                    Add
                </button>
            </div>   
        <div className="flex flex-col w-full justify-between gap-3 m-5">
            {todos && todos.map((todo, index) => {
                const text = todo.text;
                const id = todo.id;
                return (
                    <div key={index} className="justify-between flex">
                        <li className="dark:text-white text-2xl font-bold">{text}</li>
                        <button onClick={() => handleDelete(id)} className="p-3 bg-blue-600 text-white">Delete</button>
                    </div>
                )
            }) }
        </div>
            <button onClick={logout} className={buttonStyles}>Logout</button>
        </div>
    )
}


export default Dashboard