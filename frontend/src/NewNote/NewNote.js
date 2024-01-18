import styles from './NewNote.module.css';
import React, {useEffect, useState} from 'react';

function NewNote(){
    const [title, setTitle] = useState("New Title")
    const [text, setText] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:8000/notes/newNote";
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                text: text
            })
        }).then(res => {
            return res.json()
        })
        .then(
            data => console.log(data),
            alert('Submission successful!'))
        .catch(error => console.log("ERROR"))
//TODO: useEffect to update list display after new Note posted
    }


    const urlDisplay = "http://localhost:8000/notes/allNotes";
    const [notes, setNotes] = useState([]); //empty array    

    useEffect(() => {
        fetch(urlDisplay)
        .then(response => response.json())
        .then(data => {
            setNotes(data)
        })
        .catch(error => console.log(error.message))
    }, [])

    return(
        <div>
            <form onSubmit = {handleSubmit}>
                <textarea placeholder='Insert Title here...' value ={title} onChange={(e) => {setTitle(e.target.value)}} classname = "titleBox" id={styles.title} rows="3" cols="90"></textarea>
                <textarea placeholder = 'Start your note...' value ={text} onChange={(e) => {setText(e.target.value)}} id={styles.textbox} rows="45" cols="90"></textarea>
                <button type ="submit" id={styles.saveButton}>Save</button>                
            </form>

            <ul id={styles.list}>
                {notes.map((note, index) => (
                    <div><button id = {styles.titleButtons} key = {index}>{note.title}</button></div>
                ))}
            </ul>

        </div>
    );
}

export default NewNote;