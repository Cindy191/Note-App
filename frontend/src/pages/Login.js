import styles from './Login.module.css';
import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

function Login(){
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false);

    // const [registerList, setRegisterList] = useState([])
    // const [loggedIn, setLoggedIn] = useState()

    // const urlGetRegisters = "http://localhost:8000/notes/getRegisters";    
    
    // useEffect(()=> {
    //     fetch(urlGetRegisters)
    //     .then(res => res.json())
    //     .then(data => setRegisterList(data))
    //     .catch(error => console.log("Error"))
    // }, [])

    const handleLogIn = async (e) => {
        //perform check here
        e.preventDefault()
        const urlLogIn = "http://localhost:8000/notes/login"
        const response = await fetch(urlLogIn, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include', //to get the cookie
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if(response.ok){
            setRedirect(true);
        }
        else{
            alert('Invalid credentials')
        }
    }

    if(redirect){
        return <Navigate to="/notes/displayNotes" />
    }

    return(
        <div>
            <h3 id={styles.loginWord} >Login</h3>
            <form>
                <input id={styles.usernameBox} type="text" placeholder="Enter username" onChange={(e) => {setUserName(e.target.value)}}></input>
                <input id={styles.passwordBox} type="password" placeholder="Enter password" onChange={(e) => {setPassword(e.target.value)}}></input>
                <button id={styles.enterButton} type="submit" onClick={handleLogIn}>Log In</button>              
            </form>
            <p id={styles.newGuide}>(New? Click on Register at the top.)</p>
        </div>
    );
}

export default Login;