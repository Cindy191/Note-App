import styles from './Title.module.css';

function Title(){
    return(
        <div>
            <textarea id={styles.title} rows="3" cols="90">Insert Title here...</textarea>
        </div>
    );
}

export default Title;