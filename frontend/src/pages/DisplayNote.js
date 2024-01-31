import styles from './DisplayNote.module.css';
import React, {useEffect, useState} from 'react';
import {useSpeechSynthesis} from 'react-speech-kit';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function DisplayNote(){
    const [title, setTitle] = useState('')
    const [text, setText] = useState('');
    const {speak} = useSpeechSynthesis();
    const [id, setID] = useState("");
    const [loginStatus, setLoggedStatus] = useState(true)
    
    const handleOnClick = () => {
        speak({text:text});
    }


    //GET ALL TITLES
    const urlDisplay = "http://localhost:8000/notes/allNotes";
    const [notes, setNotes] = useState([]); //empty array  

    const getNotes = () => {
        fetch(urlDisplay)
        .then(response => response.json())
        .then(data => {
            setNotes(data)
        })
        .catch(error => console.log(error))        
    }

    // const getNotes = () => {
    //     axios.get(urlDisplay, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "x-access-token": localStorage.getItem("token")
    //         }
    //     })
    //     .then(res => {res.data.json()})
    //     .then(data => {
    //         setNotes(data)
    //     })
    //     .catch(error => console.log(error))        
    // }

    useEffect(() => {
        getNotes()
    },[])


    const handleUpdate = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8000/notes/update/${id}/${title}/${text}`;
        fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                // "x-access-token": localStorage.getItem("token")
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

            <button onClick = {() => {handleOnClick()}} id={styles.listen}>Listen</button>
            <button onClick={handleDelete} id={styles.delete}>Delete</button>
            {loginStatus && <Link to = "/notes/newNote" id={styles.linkNewNote}>New Note</Link>}
        </div>
    );
}

export default DisplayNote;