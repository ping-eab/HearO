import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from "react-native";

// Mapping letters and space to corresponding image paths
const ASL_IMAGES: { [key: string]: any } = {
  A: require("../../assets/asl/a.png"),
  B: require("../../assets/asl/b.png"),
  C: require("../../assets/asl/c.png"),
  D: require("../../assets/asl/d.png"),
  E: require("../../assets/asl/e.png"),
  F: require("../../assets/asl/f.png"),
  G: require("../../assets/asl/g.png"),
  H: require("../../assets/asl/h.png"),
  I: require("../../assets/asl/i.png"),
  J: require("../../assets/asl/j.png"),
  K: require("../../assets/asl/k.png"),
  L: require("../../assets/asl/l.png"),
  M: require("../../assets/asl/m.png"),
  N: require("../../assets/asl/n.png"),
  O: require("../../assets/asl/o.png"),
  P: require("../../assets/asl/p.png"),
  Q: require("../../assets/asl/q.png"),
  R: require("../../assets/asl/r.png"),
  S: require("../../assets/asl/s.png"),
  T: require("../../assets/asl/t.png"),
  U: require("../../assets/asl/u.png"),
  V: require("../../assets/asl/v.png"),
  W: require("../../assets/asl/w.png"),
  X: require("../../assets/asl/x.png"),
  Y: require("../../assets/asl/y.png"),
  Z: require("../../assets/asl/z.png"),
  " ": require("../../assets/asl/underscore.png"), 
};

export default function ASLConverter() {
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Text</Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type here..."
      />
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {inputText.toUpperCase().split("").map((char, index) => (
          ASL_IMAGES[char] ? (
            <Image key={index} source={ASL_IMAGES[char]} style={styles.image} />
          ) : null
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
  },
});