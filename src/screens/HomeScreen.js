import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [inputText, setInputText] = useState("");

  const saveMessage = async (message) => {
    try {
      const existingHistory = await AsyncStorage.getItem("conversationHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.push(message);
      await AsyncStorage.setItem("conversationHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save message", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Communication Companion</Text>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send" onPress={() => { saveMessage(inputText); setInputText(""); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default HomeScreen;
