import { UserAuth } from "./Context/UserContext";
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from "../firebase";
import { useRef } from "react";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { PhoneAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { buttonStyles } from "./Styles/CardStyles";

const Dashboard = ({ props }) => {
    const user = props;
    const { logout } = UserAuth();
    const todoItem = useRef(null);
    const pathRef = collection(firestore, `users/${user.uid}/todos`)
    const [todos] = useCollectionData(pathRef);


    const handleSubmit = async e => {
        e.preventDefault();
        const text = todoItem.current.value
        if(text) {
            try {
                const docRef = await addDoc(pathRef, {
                    text,
                    completed: false,
                    createdAt: serverTimestamp(),
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }
    };


    return (
        <div className="bg-white p-10 rounded-lg dark:bg-gray-900 my-5">
            <div className="text-xl text-red-600">Hello world</div>
            <div className="flex gap-5 m-2">
                <input ref={todoItem} type='text' placeholder="write a todo" className="px-5" />
                <button
                    className="p-5 bg-blue-600 text-white dark:text-black border boder-white"
                    type="submit"
                    onClick={handleSubmit}>
                    Add
                </button>
            </div>   
        <div className="flex flex-col w-full justify-between gap-3 m-5">
            {todos && todos.map((todo, index) => <Todo key={index} props={todo} />) }
        </div>
            <button onClick={logout} className={buttonStyles}>Logout</button>
        </div>
    )
}

const Todo = ({props}) => {
    const pathRef = auth.currentUser && collection(firestore, `users/${auth.currentUser.uid}/todos`)
    const {text, id, completed} = props

    console.log(props)
    
    const onDelete = (id) => deleteDoc(doc(pathRef, '/4rcW0NfXGDfcimH5Wrfc'))

    return (
        <div key={id} className="justify-between flex">
            <li className="dark:text-white text-2xl font-bold">{text}</li>
            <button onClick={() => onDelete(id)} className="p-3 bg-blue-600 text-white">Delete</button>
        </div>
    )
}


export default Dashboard