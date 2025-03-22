import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { API_KEY } from "@env"; // Import API key from .env file

const ChatbotScreen = () => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");

  const handleAskAI = async () => {
    if (!symptoms.trim()) return;

    const prompt = `I have the following symptoms: ${symptoms}. What could be the possible illness, and what should I do?`;

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setResponse("Error retrieving medical advice. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your symptoms:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., fever, headache, sore throat"
        value={symptoms}
        onChangeText={setSymptoms}
      />
      <Button title="Diagnose" onPress={handleAskAI} />
      <ScrollView style={styles.outputContainer}>
        <Text style={styles.response}>{response}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  outputContainer: { marginTop: 20, padding: 10, backgroundColor: "#f4f4f4" },
  response: { fontSize: 16, color: "#333" },
});

export default ChatbotScreen;
