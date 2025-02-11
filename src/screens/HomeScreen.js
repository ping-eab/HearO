import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import VoiceService from "../services/voice"; // voiceService

const HomeScreen = () => {
  const [spokenText, setSpokenText] = useState("");

  // Function to handle speech recognition results
  const handleSpeechResults = (textArray) => {
    if (textArray && textArray.length > 0) {
      setSpokenText(textArray[0]); // Get the first recognized phrase
    }
  };

  // Start listening for speech
  const startListening = () => {
    VoiceService.onSpeechResults = handleSpeechResults;
    VoiceService.startListening();
  };

  // Stop listening for speech
  const stopListening = () => {
    VoiceService.stopListening();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Communication Companion</Text>
      <Text>Recognized Speech: {spokenText}</Text>
      
      <Button title="Start Talking" onPress={startListening} />
      <Button title="Stop Talking" onPress={stopListening} />
      <Button title="Say 'Hello!'" onPress={() => VoiceService.speak("Hello! How can I assist you?")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomeScreen;