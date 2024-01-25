import styles from './Login.module.css';
import React, {useEffect, useState, Component} from 'react';
import {Navigate, redirect} from 'react-router-dom';
import axios from 'axios';

function Login(){
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleLogIn = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/notes/login',{
            username: username, 
            password: password
        })
        .then(response=> {
            console.log(response)
            localStorage.setItem('login', JSON.stringify({
                login: true,
                token: response.data.token
            }))
        })
        .catch(error => console.log(error));
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
        </div>
    );
}

export default Login;