import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // Hides default headers
          gestureEnabled: true, // Enables swipe gestures
          animationEnabled: true, // Enables smooth transitions
        }}
      >
        <Stack.Screen name="Splash" component={gestureHandlerRootHOC(SplashScreen)} />
        <Stack.Screen name="Login" component={gestureHandlerRootHOC(LoginScreen)} />
        <Stack.Screen name="Home" component={gestureHandlerRootHOC(HomeScreen)} />
        <Stack.Screen name="History" component={gestureHandlerRootHOC(HistoryScreen)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;