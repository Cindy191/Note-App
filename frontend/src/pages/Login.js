import styles from './Login.module.css';

function Login(){
    return(
        <div>
            <h3 id={styles.loginWord} >Login</h3>
            <form>
                <textarea id={styles.usernameBox} placeholder="Enter username"></textarea>
                <textarea id={styles.passwordBox} placeholder="Enter password"></textarea>
                <button id={styles.enterButton} type="submit">Enter</button>              
            </form>
            <p id={styles.newGuide}>(New? Click on Register at the top.)</p>
        </div>
    );
}

export default Login;