import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userSettings, setUserSettings] = useState({
        theme: 'light',
        fontSize: 'medium',
        voice: 'default',
    });

    const [conversationHistory, setConversationHistory] = useState([]);

    return (
        <AppContext.Provider value={{ userSettings, setUserSettings, conversationHistory, setConversationHistory }}>
            {children}
        </AppContext.Provider>
    );
};
