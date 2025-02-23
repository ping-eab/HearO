import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

const speak = (text) => {
    Tts.speak(text);
};

const startListening = (onSpeechResult) => {
    Voice.onSpeechResults = (event) => {
        onSpeechResult(event.value[0]);  // Callback to update UI
    };
    Voice.start('en-US');
};

const stopListening = () => {
    Voice.stop();
};

export { speak, startListening, stopListening };