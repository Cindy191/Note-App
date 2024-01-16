import styles from './List.module.css';
import {useEffect, useState} from 'react';

function List(){
    const url = "http://localhost:8000/notes/allNotes";
    const [notes, setNotes] = useState([]); //empty array    

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setNotes(data)
        })
        .catch(error => console.log(error.message))
    }, [])

    return(
        <div id={styles.box} class = {styles.scrollBar}>
            <ul id={styles.list}>
                {notes.map((note, index) => (
                    <li key = {index}>{note.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default List