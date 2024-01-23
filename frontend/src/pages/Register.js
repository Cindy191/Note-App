import styles from './Register.module.css';

function Register(){
    return(
        <div>
            <h3 id={styles.registerWord}>Create MySecureNotes Account</h3>
            <form id={styles.registerForm}>
                <textarea id={styles.createUsername} placeholder="Create Username"></textarea>
                <textarea id={styles.createPassword} placeholder="Create Password"></textarea>
                <button id={styles.createButton} type="submit">Create</button>
            </form>
        </div>
    );
}

export default Register;