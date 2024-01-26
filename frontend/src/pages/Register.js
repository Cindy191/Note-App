import styles from './Register.module.css';
import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';

function Register(){
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleCreateRegister = async (e) => {
        e.preventDefault();
        const urlRegister = "http://localhost:8000/notes/register";
        
        await fetch(urlRegister, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameReg,
                password: passwordReg
            })
        });
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to="/"/>;
    }

    return(
        <div>
            <h1 id={styles.registerWord}>Create MySecureNotes Account</h1>
            <form id={styles.registerForm}>
                <input type = "text" id={styles.createUsername} placeholder="Create Username" onChange={(e) => {setUsernameReg(e.target.value)}}></input>
                <input type = "password" id={styles.createPassword} placeholder="Create Password" onChange={(e) => {setPasswordReg(e.target.value)}}></input>
                <button onClick={handleCreateRegister} id={styles.createButton} type="submit">Create</button>
            </form>
        </div>
    );
}

export default Register;