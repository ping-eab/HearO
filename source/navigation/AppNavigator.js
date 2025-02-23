import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import SplashScreen from "../screens/SplashScreen";
import LoginRegisterScreen from "../screens/LoginRegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import EnterTextScreen from "../screens/EnterTextScreen";
import RecordAudioScreen from "../screens/RecordAudioScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash Screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* Combined Login Screens */}
        <Stack.Screen
          name="LoginRegister"
          component={LoginRegisterScreen}
          options={{ title: "Login/Register" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        {/* Main Screens */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="EnterText"
          component={EnterTextScreen}
          options={{ title: "Enter Text" }}
        />
        <Stack.Screen
          name="RecordAudio"
          component={RecordAudioScreen}
          options={{ title: "Record Audio" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;