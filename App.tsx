import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import Notes from "./components/Notes";
import ASLConverter from "./components/ASL Converter"; // Import ASLConverter
import { ThemeProvider, useTheme } from "./context/ThemeContext"; // Import ThemeProvider & useTheme

const Tab = createBottomTabNavigator();

function MainNavigator() {
  const { theme } = useTheme(); // Get theme context

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName = "record";
          if (route.name === "Record") {
            iconName = "record-vinyl";
          } else if (route.name === "History") {
            iconName = "history";
          } else if (route.name === "ASL Converter") {
            iconName = "sign-language"; // Uses a sign-related icon
          }
          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: theme === "dark" ? "#FFA500" : "#007AFF",
        tabBarInactiveTintColor: theme === "dark" ? "#888" : "#555",
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#222" : "#FFF",
        },
      })}
    >
      <Tab.Screen name="HearO:Your Communication Companion" component={Home} />
      <Tab.Screen name="HearO:Your Communication Companion" component={Notes} />
      <Tab.Screen name="ASL Converter" component={ASLConverter} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider> {/* Wraps entire app */}
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});