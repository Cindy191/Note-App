import styles from './DisplayNote.module.css';
import React, {useEffect, useState} from 'react';

import {Container, Segment} from 'semantic-ui-react';
import {useSpeechSynthesis} from 'react-speech-kit';

function DisplayNote(props){

    useEffect(() => {
        (
            async (e) => {
                const response = await fetch('http://localhost:8000/notes/register', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                const content = await response.json();
                console.log(content)

            }
        )();
    }, [])


    //POST
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [id, setID] = useState("");


    //GET ALL TITLES
    const urlDisplay = "http://localhost:8000/notes/allNotes";
    const [notes, setNotes] = useState([]); //empty array  

    const getNotes = () => {
        fetch(urlDisplay)
        .then(response => response.json())
        .then(data => {
            setNotes(data)
        })
        .catch(error => console.log(error.message))        
    }

    useEffect(() => {
        getNotes()
    },[])


    const handleUpdate = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8000/notes/update/${id}/${title}/${text}`;
        fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                text: text
            })
        }).then(res => {
            getNotes()
            setTitle(title)
            setText(text)
            return res.json()
        })
        .then(
            data => console.log(data),
            alert('Update successful!'))
        .catch(error => console.log("ERROR"))
    }

    const urlDelete = `http://localhost:8000/notes/delete/${id}`;
    const handleDelete = () => {
        fetch(urlDelete, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            // notes.splice(id, 1); // "splice" out the list item we want to delete, but don't return a new list
            getNotes();   //rerenders with the updated list for frontend
            setTitle("");
            setText("");
            return res.json();
        })
        .catch(error => console.log(error))
    }
    
    return(
        <div>
            {/* displays the notes and list items */}
            <ul id={styles.list}>
                {notes.map((note, i) => (
                    <div key = {i}><button onClick={() => {setText(note.text); setTitle(note.title); setID(note._id); console.log(note._id)}} id = {styles.titleButtons} >{note.title}</button></div>
                ))}
            </ul>
            
            <form id = {styles.form} onSubmit = {handleUpdate}>
                <textarea placeholder='Click Note Item to Display' value ={title} onChange={(e) => {setTitle(e.target.value)}} className = "titleBox" id={styles.title} rows="3" cols="90"></textarea>
                <textarea placeholder = 'Click Note Item to Display' value ={text} onChange={(e) => {setText(e.target.value)}} id={styles.textbox} rows="45" cols="90"></textarea>
                <button type ="submit" id={styles.saveButton}>Save Edit</button>                
            </form>

            <button onClick={handleDelete} id={styles.delete}>Delete</button>

        </div>
    );
}

export default DisplayNote;