import React, {useState} from 'react';
import {Container, Segment} from 'semantic-ui-react';
import {useSpeechSynthesis} from 'react-speech-kit';

function SpeechToText(){
    const [text, setText] = useState('');
    const {speak} = useSpeechSynthesis();

    const handleOnClick = () => {
        speak({text:text})
    }
    return(
        <Container>
            <Segment>
                <textarea onChange={(e) => {setText(e.target.value)}}></textarea>
                <button onClick = {() => {handleOnClick()}}></button>
            </Segment>
        </Container>
    );
}

export default SpeechToText;