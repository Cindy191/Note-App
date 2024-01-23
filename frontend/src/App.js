import Nav from './Nav/Nav.js';
import Login from './pages/Login.js';
import DisplayNote from './pages/DisplayNote.js';
import NewNote from './pages/NewNote.js';
import Register from './pages/Register.js';
import SpeechTTButton from './SpeechTTButton/SpeechTTButton.js';
import {Routes, Route} from 'react-router-dom';

function App(){
    return(
        <div>
            <Nav />
                <Routes>
                    <Route path = "/notes/register" element = {<Register />}/>
                    <Route path = "/notes/newNote" element = {<NewNote /> }/>
                    <Route path = "/notes/displayNotes" element = {<DisplayNote /> }/>  
                    <Route path = "/" element = {<Login/>} />
                </Routes>
        </div>
    );
}

export default App