import Nav from './Nav/Nav.js';
import Login from './pages/Login.js';
import DisplayNote from './pages/DisplayNote.js';
import NewNote from './pages/NewNote.js';
import Register from './pages/Register.js';
// import SpeechToText from './SpeechToText.js';
import {Routes, Route} from 'react-router-dom';

function App(){
    return(
        <div>
            <Nav />
                <Routes>
                    {/* <Route exact path = "/speech" element = {<SpeechToText />} /> */}
                    <Route exact path = "/" element = {<Login/>} />
                    <Route exact path = "/notes/register" element = {<Register />}/>
                    <Route exact path = "/notes/newNote" element = {<NewNote /> }/>
                    <Route exact path = "/notes/displayNotes" element = {<DisplayNote /> }/>  
                </Routes>
        </div>
    );
}

export default App