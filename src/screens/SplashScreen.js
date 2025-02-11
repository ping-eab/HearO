import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000); // Redirect to Login after 2 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HearO</Text>
      <Text>Your Communication Companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SplashScreen;
