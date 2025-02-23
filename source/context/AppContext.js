import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // User settings remain the same
  const [userSettings, setUserSettings] = useState({
    theme: "light",
    fontSize: "medium",
    voice: "default",
  });

  // Conversation history is initially empty
  const [conversationHistory, setConversationHistory] = useState([]);

  // 1) Load conversationHistory from AsyncStorage on app startup
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const storedData = await AsyncStorage.getItem("@conversationHistory");
        if (storedData) {
          setConversationHistory(JSON.parse(storedData));
        }
      } catch (error) {
        console.log("Error loading conversation history:", error);
      }
    };

    loadConversations();
  }, []);

  // 2) Add a new conversation/transcript
  const addConversation = async (text) => {
    const newItem = {
      id: (conversationHistory.length + 1).toString(),
      text,
      timestamp: new Date().toISOString(),
    };

    const updated = [...conversationHistory, newItem];
    setConversationHistory(updated);

    try {
      await AsyncStorage.setItem(
        "@conversationHistory",
        JSON.stringify(updated)
      );
    } catch (error) {
      console.log("Error saving conversation history:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userSettings,
        setUserSettings,
        conversationHistory,
        setConversationHistory,
        addConversation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};