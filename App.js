import React, { useEffect } from "react";
import { GestureHandlerRootView, gestureHandlerRootHOC } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PermissionsAndroid, Platform } from "react-native";
import Tts from "react-native-tts";
import Voice from "@react-native-voice/voice";

import { AppProvider } from "./source/context/AppContext";
import AppNavigator from "./source/navigation/AppNavigator";

import SplashScreen from "./source/screens/SplashScreen";
import LoginScreen from "./source/screens/LoginScreen";
import HomeScreen from "./source/screens/HomeScreen";
import HistoryScreen from "./source/screens/HistoryScreen";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Request permissions for TTS & STT on Android
    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        try {
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
        } catch (err) {
          console.warn("Permission error:", err);
        }
      }
    };
    requestPermissions();

    // TTS Initialization
    Tts.setDefaultLanguage("en-US");
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.0);

    // STT Event Handlers
    Voice.onSpeechError = (error) => console.error("STT Error:", error);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              animationEnabled: true,
            }}
          >
            <Stack.Screen name="Splash" component={gestureHandlerRootHOC(SplashScreen)} />
            <Stack.Screen name="Login" component={gestureHandlerRootHOC(LoginScreen)} />
            <Stack.Screen name="Home" component={gestureHandlerRootHOC(HomeScreen)} />
            <Stack.Screen name="History" component={gestureHandlerRootHOC(HistoryScreen)} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

export default App;
