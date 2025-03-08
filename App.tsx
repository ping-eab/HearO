import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import Notes from "./components/Notes";
import { ThemeProvider, useTheme } from "./context/ThemeContext"; // ✅ Import ThemeProvider & useTheme

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { theme } = useTheme(); // ✅ Get theme context

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName = "record";
            if (route.name === "Record") {
              iconName = "record-vinyl";
            } else if (route.name === "History") {
              iconName = "history";
            }
            return <FontAwesome5 name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: theme === "dark" ? "#FFA500" : "#007AFF", // ✅ Dynamic icon color
          tabBarInactiveTintColor: theme === "dark" ? "#888" : "#555",
          tabBarStyle: {
            backgroundColor: theme === "dark" ? "#222" : "#FFF", // ✅ Dynamic background
          },
        })}
      >
        <Tab.Screen name="Record" component={Home} />
        <Tab.Screen name="History" component={Notes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider> {/* ✅ Wrap the entire app */}
      <AppNavigator />
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
