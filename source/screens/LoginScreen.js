import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
// If you plan to store user data in context:
import { AppContext } from "../context/AppContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // If you want to store user data in context:
  const { setUserSettings } = useContext(AppContext);

  const handleLogin = () => {
    // Simple validation example:
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Mock user validation (replace with real auth logic)
    if (email === "test@example.com" && password === "password") {
      // If using context to store user info, you could do something like:
      setUserSettings((prev) => ({
        ...prev,
        userEmail: email,
      }));

      // Navigate to Home screen after successful login
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Invalid credentials. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to HearO</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    // Shadow on Android
    elevation: 2,
    // Shadow on iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  registerLink: {
    marginTop: 16,
    alignItems: "center",
  },
  registerText: {
    color: "#4CAF50",
    fontSize: 16,
  },
});