import { collection, serverTimestamp, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from "../firebase";
import { useRef } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { inputStyles } from "./Styles/Styles";
import { uuidv4 } from "@firebase/util";
import trash from '../icons/trash.png'
import add from '../icons/add.png'
import checked from '../icons/checked.png'

const Dashboard = ({ user }) => {
    const todoItem = useRef(null);
    const pathRef = collection(firestore, `users/${ user.uid || user }/todos`)
    const [todos] = useCollectionData(pathRef);

    const handleSubmit = async e => {
        e.preventDefault();
        const text = todoItem.current.value;
        const input = document.getElementById('inputField');
        const id = uuidv4();
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

    const handleDelete = async (id, completed) => {
        const target = document.getElementById(id);
        if (completed) {
            target.classList.remove('w-11/12')
            target.classList.add('w-0', 'ease-out');
        } else {
            target.classList.remove('w-0');
            target.classList.add('w-11/12', 'ease-in-out');
        };

        setTimeout(() => {
            deleteDoc(doc(pathRef, id))
        }, 1000)
    };

    const handleChecked = async (id, completed) => {
        const target = document.getElementById(id);
        const todoRef = doc(pathRef, id);

        if (completed) {
            target.classList.add('w-0', 'ease-out');
            return await updateDoc(todoRef, { completed: false });
        }

        return await updateDoc(todoRef, { completed: true });
    };


    return (
        <div className="bg-gray-200 shadow-2xl border border-gray-200 dark:border-0 rounded-lg dark:bg-gray-900 px-2 w-full max-w-xs md:max-w-none md:w-2/4">
            <form className="flex gap-5 w-full mt-5">
                <input id={'inputField'} ref={todoItem} type='text' placeholder="Write a todo" className={inputStyles} />
                <button
                    className='group relative flex place-content-center place-items-center hover:-translate-y-1 transition-all duration-200 dark:invert'
                    type="submit"
                    id='addButton'
                    onClick={handleSubmit}>
                    <div className='absolute bottom-11 opacity-0 bg-gray-100 px-2 font-semibold rounded-md group-hover:h-7 group-hover:min-w-10 group-hover:opacity-95 transition-all duration-200'>
                        Add
                    </div>
                    <img src={add} height='34' width='34' alt='add' />
                </button>
            </form>
            <div className="flex flex-col justify-between gap-3 py-5">
                {todos && todos.map(todo => {
                    const text = todo.text;
                    const id = todo.id;
                    const completed = todo.completed;

                    return (
                        <div key={id} className="flex justify-between place-items-center">
                            <div className="group flex relative break-words whitespace-break w-3/4">
                                <div id={id}
                                    className={`${ completed ? 'w-11/12' : 'w-0' } h-1 rounded-md absolute place-self-center opacity-90 dark:bg-white bg-black trasition-width duration-1000`} />
                                <div className='w-10/12'>
                                    <h5 className="dark:text-white text-xl font-bold mb-1">{text}</h5>
                                </div>
                            </div>
                            <div className='flex gap-2 w-1/4 xl:w-1/12'>
                                <button onClick={() => handleChecked(id, completed)} className='group relative flex place-content-center dark:invert group-hover: hover:-translate-y-1 transition-all duration-200'>
                                    <div className='absolute bottom-7 opacity-0 bg-gray-100 px-2 font-semibold rounded-md group-hover:h-7 group-hover:min-w-10 group-hover:opacity-95 transition-all duration-200'>
                                        {completed ? 'Uncheck' : 'Check'}
                                    </div>
                                    <img src={checked} height='32' width='32' alt='checked' />
                                </button>
                                <button onClick={() => handleDelete(id, completed)} className='group relative flex place-content-center dark:invert hover:-translate-y-1 transition-all duration-200'>
                                    <div className='absolute bottom-7 opacity-0 bg-gray-100 px-2 font-semibold rounded-md group-hover:h-7 group-hover:min-w-10 group-hover:opacity-95 transition-all duration-200'>
                                        Delete
                                    </div>
                                    <img src={trash} height='32' width='32' alt='delete' />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Dashboard