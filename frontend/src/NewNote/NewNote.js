import styles from './NewNote.module.css';
import React, {useState} from 'react';

function NewNote(){
    const [title, setTitle] = useState("")
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

    }
    return(
        <div>
            <form onSubmit = {handleSubmit}>
                <textarea placeholder='Insert Title here...' value ={title} onChange={(e) => {setTitle(e.target.value)}} classname = "titleBox" id={styles.title} rows="3" cols="90"></textarea>
                <textarea placeholder = 'Start your note...' value ={text} onChange={(e) => {setText(e.target.value)}} id={styles.textbox} rows="45" cols="90"></textarea>
                <button type ="submit" id={styles.saveButton}>Save</button>                
            </form>

        </div>
    );
}

export default NewNote;