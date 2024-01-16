import List from './List/List.js';
import NewNote from './NewNote/NewNote.js';
import NewButton from './NewButton/NewButton.js';
import DeleteButton from './DeleteButton/DeleteButton.js';
import SpeechTTButton from './SpeechTTButton/SpeechTTButton.js';

function App(){
    return(
        <div>
            <List/>
            <NewNote/>
            <NewButton/>
            <DeleteButton/>
            <SpeechTTButton/>
        </div>
    );
}

export default App