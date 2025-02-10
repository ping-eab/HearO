import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Tts from "react-native-tts";

export default function HomeScreen() {
  const [text, setText] = useState("");

  const handleSpeak = () => {
    Tts.speak(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deaf Communication Assistant</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Speak Text" onPress={handleSpeak} />
    </View>
  );
}

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
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
