import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";

console.log("Voice module:", Voice); // Debugging: Check if Voice is properly imported

type Props = {
  onSpeechStart: () => void;
  onSpeechEnd: (result: string[]) => void;
};

type State = {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: boolean;
  results: string[];
  partialResults: string[];
};

class VoiceTest extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      recognized: "",
      pitch: "",
      error: "",
      end: "",
      started: false,
      results: [],
      partialResults: [],
    };

    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(() => Voice.removeAllListeners());
  }

  requestMicrophonePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message:
              "This app needs access to your microphone to recognize speech.",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS automatically has permission
  };

  onSpeechStart = (e: any) => {
    console.log("onSpeechStart: ", e);
    this.setState({ started: true });
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log("onSpeechRecognized: ", e);
    this.setState({ recognized: "√" });
  };

  onSpeechEnd = (e: any) => {
    console.log("onSpeechEnd: ", e);
    this.setState({ end: "√", started: false });
    this.props.onSpeechEnd(this.state.results);
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log("onSpeechError: ", e);
    this.setState({ error: JSON.stringify(e.error) });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechResults: ", e);
    this.setState({ results: e.value || [] });
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechPartialResults: ", e);
    this.setState({ partialResults: e.value || [] });
  };

  onSpeechVolumeChanged = (e: any) => {
    console.log("onSpeechVolumeChanged: ", e);
    this.setState({ pitch: e.value });
  };

  _startRecognizing = async () => {
    const hasPermission = await this.requestMicrophonePermission();
    if (!hasPermission) {
      console.error("Microphone permission denied");
      return;
    }

    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: false,
      results: [],
      partialResults: [],
      end: "",
    });

    try {
      if (!Voice || !Voice.start) {
        console.error("Voice module is not initialized properly.");
        return;
      }

      console.log("Starting Voice Recognition...");
      await Voice.start("en-US");

      this.props.onSpeechStart?.();
    } catch (e) {
      console.error("Error starting voice recognition: ", e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: false,
      results: [],
      partialResults: [],
      end: "",
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.started ? (
          <TouchableHighlight onPress={this._stopRecognizing}>
            <View style={styles.micContainer}>
              <FontAwesome name="microphone-slash" size={24} color="#fff" />
            </View>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onLongPress={this._startRecognizing}>
            <View style={styles.micContainer}>
              <FontAwesome name="microphone" size={24} color="#fff" />
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  micContainer: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: "#6E01EF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VoiceTest;