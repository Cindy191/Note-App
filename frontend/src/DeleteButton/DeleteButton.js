import styles from './DeleteButton.module.css';

function DeleteButton(){
    return(
        <div>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <button id={styles.newButton}> <i class="fa-solid fa-trash"></i> Delete</button>
        </div>
    );
}

export default DeleteButton;