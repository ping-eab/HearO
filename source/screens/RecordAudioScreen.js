import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import Voice from "@react-native-voice/voice";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../context/AppContext";

const RecordAudioScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Pull addConversation from context
  const { addConversation } = useContext(AppContext);

  useEffect(() => {
    // Request microphone permission on Android
    const requestMicrophonePermission = async () => {
      if (Platform.OS === "android") {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
          );
        } catch (error) {
          console.warn("Microphone permission error:", error);
        }
      }
    };
    requestMicrophonePermission();

    // Attach speech event handlers
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Cleanup listeners on unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    if (event.value && event.value.length > 0) {
      const recognizedText = event.value[0];
      setTranscript(recognizedText);

      // Save recognized text to conversation history
      addConversation(recognizedText);
    }
  };

  const onSpeechError = (error) => {
    console.log("STT Error:", error);
    setIsRecording(false);
  };

  const startRecording = async () => {
    setTranscript("");
    setIsRecording(true);
    try {
      await Voice.start("en-US");
    } catch (error) {
      console.log("Error starting voice recognition:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log("Error stopping voice recognition:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Audio (STT)</Text>

      <View style={styles.transcriptContainer}>
        <Text style={styles.transcriptLabel}>Transcript:</Text>
        <Text style={styles.transcriptText}>{transcript}</Text>
      </View>

      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recording]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons
          name={isRecording ? "stop-circle" : "mic-circle"}
          size={70}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default RecordAudioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#333",
  },
  transcriptContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transcriptLabel: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  transcriptText: {
    color: "#555",
    fontSize: 16,
  },
  recordButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 70 / 2,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  recording: {
    backgroundColor: "#e53935",
  },
});