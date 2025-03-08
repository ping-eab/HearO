import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types for context
interface UserSettings {
  theme: string;
  fontSize: string;
  voice: string;
}

interface Conversation {
  id: string;
  text: string;
  timestamp: string;
}

interface AppContextType {
  userSettings: UserSettings;
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
  conversationHistory: Conversation[];
  setConversationHistory: React.Dispatch<React.SetStateAction<Conversation[]>>;
  addConversation: (text: string) => Promise<void>;
}

// Create context with initial undefined value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Define props for AppProvider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // User settings state
  const [userSettings, setUserSettings] = useState<UserSettings>({
    theme: "light",
    fontSize: "medium",
    voice: "default",
  });

  // Conversation history state
  const [conversationHistory, setConversationHistory] = useState<Conversation[]>([]);

  // Load conversationHistory from AsyncStorage on app startup
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const storedData = await AsyncStorage.getItem("@conversationHistory");
        if (storedData) {
          setConversationHistory(JSON.parse(storedData) as Conversation[]);
        }
      } catch (error) {
        console.log("Error loading conversation history:", error);
      }
    };

    loadConversations();
  }, []);

  // Add a new conversation/transcript
  const addConversation = async (text: string): Promise<void> => {
    const newItem: Conversation = {
      id: (conversationHistory.length + 1).toString(),
      text,
      timestamp: new Date().toISOString(),
    };

    const updated = [...conversationHistory, newItem];
    setConversationHistory(updated);

    try {
      await AsyncStorage.setItem("@conversationHistory", JSON.stringify(updated));
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
