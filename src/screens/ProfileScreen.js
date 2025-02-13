import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import VoiceService from "../services/voice";

const ProfileScreen = () => {
  const [spokenText, setSpokenText] = useState("");

  const handleSpeechResults = (textArray) => {
    if (textArray && textArray.length > 0) {
      setSpokenText(textArray[0]);
    }
  };

  const startListening = () => {
    VoiceService.onSpeechResults = handleSpeechResults;
    VoiceService.startListening();
  };

  const stopListening = () => {
    VoiceService.stopListening();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Recognized Speech: {spokenText}</Text>
      <Button title="Start Talking" onPress={startListening} />
      <Button title="Stop Talking" onPress={stopListening} />
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

export default ProfileScreen;
