import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([
    { id: "1", text: "Hello, how are you?" },
    { id: "2", text: "Can you help me with something?" },
    { id: "3", text: "Where is the nearest hospital?" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversation History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.clearButton} onPress={() => setHistory([])}>
        <Text style={styles.buttonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  historyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HistoryScreen;