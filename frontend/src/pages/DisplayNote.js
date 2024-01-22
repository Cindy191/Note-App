import styles from './DisplayNote.module.css';
import React, {useEffect, useState} from 'react';

function DisplayNote(props){

    //POST
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [id, setID] = useState("");


    //GET ALL TITLES
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

    const handleSubmit = async (e) => {
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
            return res.json()
        })
        .then(
            data => console.log(data),
            alert('Update successful!'))
        .catch(error => console.log("ERROR"))
    }

    const urlDelete = `http://localhost:8000/notes/delete/${id}`;
    const HandleDelete = async (e) => {
        fetch(urlDelete, {
            method: "DELETE"
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .catch(error => console.log("Error"))
    }
    
    return(
        <div>
            {/* displays the notes and list items */}
            <ul id={styles.list}>
                {notes.map((note, i) => (
                    <div key = {i}><button onClick={() => {setText(note.text); setTitle(note.title); setID(note._id); console.log(note._id)}} id = {styles.titleButtons} >{note.title}</button></div>
                ))}
            </ul>
            
            <form id = {styles.form} onSubmit = {handleSubmit}>
                <textarea placeholder='Click Note Item to Display' value ={title} onChange={(e) => {setTitle(e.target.value)}} className = "titleBox" id={styles.title} rows="3" cols="90"></textarea>
                <textarea placeholder = 'Click Note Item to Display' value ={text} onChange={(e) => {setText(e.target.value)}} id={styles.textbox} rows="45" cols="90"></textarea>
                <button type ="submit" id={styles.saveButton}>Save Edit</button>                
            </form>

            <button onClick={HandleDelete} id={styles.delete}>Delete</button>

        </div>
    );
}

export default DisplayNote;