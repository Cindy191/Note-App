import styles from './List.module.css';
function List(){
    return(
        <div id={styles.box} class = {styles.scrollBar}>
            <ul id={styles.list}>
                <li>note1</li>
                <li>note2</li>
                <li>note3</li>
                <li>note4</li>
            </ul>
        </div>
    );
}

export default List