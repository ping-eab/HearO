import Tts from 'react-native-tts';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';

const speak = (text: string): void => {
    Tts.speak(text);
};

const startListening = (onSpeechResult: (result: string) => void): void => {
    Voice.onSpeechResults = (event: SpeechResultsEvent) => {
        if (event.value && event.value.length > 0) {
            onSpeechResult(event.value[0]);  // Callback to update UI
        }
    };
    Voice.start('en-US');
};

const stopListening = (): void => {
    Voice.stop();
};

export { speak, startListening, stopListening };
