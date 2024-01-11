import styles from './Textbox.module.css';

function Textbox(){
    return(
        <div>
            <textarea id={styles.textbox} rows="45" cols="90">Start your note...</textarea>
        </div>
    );
}

export default Textbox;