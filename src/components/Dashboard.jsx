import { collection, serverTimestamp, deleteDoc, doc, setDoc, getDocs } from 'firebase/firestore';
import { firestore } from "../firebase";
import { useRef } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { buttonStyles, inputStyles } from "./Styles/CardStyles";
import { uuidv4 } from "@firebase/util";
import trash  from '../icons/trash.png'

const Dashboard = ({ user }) => {
    const todoItem = useRef(null);
    const pathRef = collection(firestore, `users/${ user.uid || user }/todos`)
    const [todos] = useCollectionData(pathRef);
    //const test = getDocs(collection(firestore, `users/${ user.uid }/todos1`)).then(docs => console.log(docs))


    const handleSubmit = async e => {
        e.preventDefault();
        const text = todoItem.current.value;
        const id = uuidv4();
        const input = document.getElementById('inputField');
        const textIsNotWhiteSpace = !text.match(/^ *$/);

        if (text && textIsNotWhiteSpace) {
            try {
                input.value = "";
                await setDoc(doc(pathRef, id), {
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
        <div className="bg-white rounded-lg dark:bg-gray-900 px-2 w-full max-w-xs md:max-w-none md:w-2/4">
            <form className="flex gap-5 w-full mt-5">
                <input id={'inputField'} ref={todoItem} type='text' placeholder="Write a todo" className={inputStyles} />
                <button
                    className={`${ buttonStyles } w-1/4`}
                    type="submit"
                    onClick={handleSubmit}>
                    Add
                </button>
            </form>
            <div className="flex flex-col justify-between gap-3 py-5">
                {todos && todos.map(todo => {
                    const text = todo.text;
                    const id = todo.id;
                    return (
                        <div key={id} className="flex justify-between place-items-center">
                            <div className="break-words whitespace-pre-line max-w-md w-8/12">
                                <h5 className="dark:text-white text-xl font-bold">{text}</h5>
                            </div>
                            <button onClick={() => handleDelete(id)} className='rounded-md w-1/4 md:w-auto dark:hover:invert hover:-translate-y-1 transition-all duration-200'>
                                <img src={trash} height='30' width='30' alt='delete' />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Dashboard