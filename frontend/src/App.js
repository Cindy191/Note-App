import List from './List/List.js';
import Textbox from './Textbox/Textbox.js';
import Title from './Title/Title.js';
import NewButton from './NewButton/NewButton.js';
import DeleteButton from './DeleteButton/DeleteButton.js';
import SpeechTTButton from './SpeechTTButton/SpeechTTButton.js';

function App(){
    return(
        <div>
            <List/>
            <Textbox/>
            <Title/>
            <NewButton/>
            <DeleteButton/>
            <SpeechTTButton/>
        </div>
    );
}

export default App