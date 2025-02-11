import Voice from "@react-native-voice/voice";
import * as Speech from "expo-speech";

class VoiceService {
  constructor() {
    this.onSpeechStart = null;
    this.onSpeechEnd = null;
    this.onSpeechResults = null;
    this.onSpeechError = null;

    Voice.onSpeechStart = (event) => this.onSpeechStart?.(event);
    Voice.onSpeechEnd = (event) => this.onSpeechEnd?.(event);
    Voice.onSpeechResults = (event) => this.onSpeechResults?.(event.value);
    Voice.onSpeechError = (event) => this.onSpeechError?.(event.error);
  }

  /**
   * 🎙 Start Speech-to-Text (STT)
   */
  async startListening() {
    try {
      await Voice.start("en-US");
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  }

  /**
   * ⏹ Stop Speech-to-Text (STT)
   */
  async stopListening() {
    try {
      await Voice.stop();
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  }

  /**
   * 🔊 Text-to-Speech (TTS)
   * @param {string} text - The text to be spoken
   */
  speak(text) {
    Speech.speak(text, {
      language: "en-US",
      pitch: 1.0,
      rate: 1.0,
    });
  }

  /**
   * 🚫 Stop Speaking
   */
  stopSpeaking() {
    Speech.stop();
  }
}

export default new VoiceService();