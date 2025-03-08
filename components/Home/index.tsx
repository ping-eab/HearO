import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import Record from "../Record";
import { useTheme } from "../../context/ThemeContext"; // ✅ Import ThemeContext

export default function Home() {
  const [speechText, setSpeechText] = useState("");
  const { theme, toggleTheme } = useTheme(); // ✅ Get theme & toggle function

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#222" : "#F5FCFF" },
      ]}
    >
      {/* Theme Toggle Button */}
      <View style={{ marginBottom: 20 }}>
        <Button
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          onPress={toggleTheme}
          color={theme === "dark" ? "#FFA500" : "#007AFF"}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text
          style={[
            styles.label,
            { color: theme === "dark" ? "#FFF" : "#000" },
          ]}
        >
          Speech Text
        </Text>
        <TextInput
          multiline
          style={[
            styles.textInput,
            {
              color: theme === "dark" ? "#FFF" : "#000",
              backgroundColor: theme === "dark" ? "#333" : "#FFF",
              borderColor: theme === "dark" ? "#888" : "#d1d5db",
            },
          ]}
          numberOfLines={6}
          value={speechText}
          maxLength={500}
          editable={true}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Save"
            color={theme === "dark" ? "#FFA500" : "#007AFF"}
            onPress={async () => {
              console.log("save");
            }}
          />
          <Button
            title="Clear"
            color={theme === "dark" ? "#FFA500" : "#007AFF"}
            onPress={() => {
              setSpeechText("");
            }}
          />
        </View>
      </View>

      <View style={styles.voiceContainer}>
        <Record
          onSpeechEnd={(value) => {
            setSpeechText(value[0]);
          }}
          onSpeechStart={() => {
            setSpeechText("");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    height: "50%",
    width: "100%",
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    height: 200,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  voiceContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});