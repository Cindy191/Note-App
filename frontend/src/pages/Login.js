import styles from './Login.module.css';
import React, {useEffect, useState, Component} from 'react';
import {Navigate, redirect, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Link, useMatch, useResolvedPath } from "react-router-dom";

function Login(){
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [loginStatus, setLoggedStatus] = useState(false)

    const handleLogIn = (e) => {
        e.preventDefault()
            axios.post('http://localhost:8000/notes/login',{
                username: username, 
                password: password
            })
            .then(res => {
                console.log(res)
                if(res.data.auth){ //once authenticated then setLoggedStatus to true
                    // navigate('/notes/displayNotes');   
                    console.log(res.data.message);
                    localStorage.setItem("token", res.data.token)
                    setLoggedStatus(true);
                }
                else{ //not authenticated => setLoggedStatus to false
                    setLoggedStatus(false);
                    alert(res.data.message)
                }
            })
            .catch (error => {
                console.log(error)
            })
   }

    return(
        <div>
            <h1 id= {styles.welcome}>Welcome to MySecureNote!</h1>
            <h3 id={styles.loginWord} >Login</h3>
            <form>
                <input id={styles.usernameBox} type="text" placeholder="Enter username" onChange={(e) => {setUserName(e.target.value)}}></input>
                <input id={styles.passwordBox} type="password" placeholder="Enter password" onChange={(e) => {setPassword(e.target.value)}}></input>
                <button id={styles.enterButton} type="submit" onClick={handleLogIn}>Log In</button>              
            </form>
            <p id={styles.newGuide}>(New? Click on Register at the top.)</p>
            {loginStatus && <Link to = "/notes/displayNotes">MyNotes</Link>} 
            {loginStatus && <Link to = "/notes/newNote">New Note</Link>}
            {/* {loginStatus && <button onClick ={authenticateUser}>DisplayNotes</button>} */}
        </div>
    );
}

export default Login;