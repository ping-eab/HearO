import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";

// Define the shape of a conversation history item
interface ConversationItem {
  id: string;
  text: string;
  timestamp: string;
}

const ConversationHistoryScreen: React.FC = () => {
  const { conversationHistory } = useContext(AppContext) as {
    conversationHistory: ConversationItem[];
  };

  const renderItem = ({ item }: { item: ConversationItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversation History</Text>
      {conversationHistory.length === 0 ? (
        <Text>No conversations yet.</Text>
      ) : (
        <FlatList
          data={conversationHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default ConversationHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#FFF",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    marginTop: 4,
    fontSize: 12,
    color: "#888",
  },
});
