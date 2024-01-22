import styles from './NewNote.module.css';
import React, {useEffect, useState} from 'react';

function NewNote(){
    //POST
    const [title, setTitle] = useState("Untitled Title")
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
            getNotes()
            return res.json()
        })
        .then(
            data => console.log(data),
            alert('Submission successful!'))
        .catch(error => console.log("ERROR"))
    }

    //GET ALL TITLES
    const urlDisplay = "http://localhost:8000/notes/allNotes";
    const [notes, setNotes] = useState([]); //empty array
    const [id, setID] = useState("");

        useEffect(() => {
            getNotes();
        }, [])

    const getNotes = () => {
        fetch(urlDisplay)
        .then(response => response.json())
        .then(data => {
            setNotes(data)
        })
        .catch(error => console.log(error.message))            
    }

    return(
        <div>
            <form id = {styles.form} onSubmit = {handleSubmit}>
                <textarea placeholder='Insert Title here...' value ={title} onChange={(e) => {setTitle(e.target.value)}} className = "titleBox" id={styles.title} rows="3" cols="90"></textarea>
                <textarea placeholder = 'Start your note...' value ={text} onChange={(e) => {setText(e.target.value)}} id={styles.textbox} rows="45" cols="90"></textarea>
                <button type ="submit" id={styles.saveButton}>Save</button>                
            </form>

            {/* displays the notes and list items */}
            <ul id={styles.list}>
                {notes.map((note, i) => (
                    // <div key = {i}><button onClick={() => {setText(note.text); setTitle(note.title); setID(note._id)}} id = {styles.titleButtons} >{note.title}</button></div>
                    <p id={styles.titleItems}key = {i}>{note.title}</p>
                ))}
            </ul>
        </div>
    );
}

export default NewNote;