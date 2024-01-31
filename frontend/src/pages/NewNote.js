import styles from './NewNote.module.css';
import React, {useEffect, useState} from 'react';
import {Link, useMatch, useResolvedPath } from "react-router-dom";
import axios from 'axios';

function NewNote(){
    //POST
    const [title, setTitle] = useState("Untitled Title")
    const [text, setText] = useState("")
    const[loginStatus, setLoggedStatus] = useState(true)

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

    const getNotes = () => {
        fetch(urlDisplay)
        .then(response => response.json())
        .then(data => {
            setNotes(data)
        })
        .catch(error => console.log(error.message))            
    }

    // const getNotes = () => {
    //     axios.get(urlDisplay, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "x-access-token": "Bearer" + localStorage.getItem("token")
    //         }
    //     })
    //     .then((res) => {
    //         res.json();
    //     })
    //     .then(data => {
    //         setNotes(data)
    //     })
    //     .catch(error => console.log(error))        
    // }

    useEffect(() => {
        getNotes();
    }, [])


    return(
        <div>
            <form id = {styles.form} onSubmit = {handleSubmit}>
                <textarea placeholder='Insert Title here...' value ={title} onChange={(e) => {setTitle(e.target.value)}} className = "titleBox" id={styles.title} rows="3" cols="90"></textarea>
                <textarea placeholder = 'Start your note...' value ={text} onChange={(e) => {setText(e.target.value)}} id={styles.textbox} rows="44" cols="90"></textarea>
                <button type ="submit" id={styles.saveButton}>Save</button>                
            </form>

            {/* displays the notes and list items */}
            <ul id={styles.list}>
                {notes.map((note, i) => (
                    <p id={styles.titleItems}key = {i}>{note.title}</p>
                ))}
            </ul>
            {loginStatus && <Link to = "/notes/displayNotes" id={styles.linkDisplayNote}>MyNotes</Link>} 
        </div>
    );
}

export default NewNote;