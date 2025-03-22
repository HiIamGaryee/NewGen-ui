import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

const ChatbotScreen = () => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDiagnosis = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setResponse((prev) => [...prev, { type: "user", text: symptoms }]);

    try {
      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a medical AI chatbot that provides diagnoses based on symptoms." },
          { role: "user", content: `My symptoms are: ${symptoms}. What could be the possible diagnosis?` },
        ],
      });

      setResponse((prev) => [...prev, { type: "ai", text: aiResponse.choices[0].message.content }]);
    } catch (error) {
      setResponse((prev) => [...prev, { type: "ai", text: "Error fetching response. Try again." }]);
    } finally {
      setLoading(false);
    }
    
    setSymptoms("");
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {response.map((msg, index) => (
          <View key={index} style={{ marginBottom: 10, alignSelf: msg.type === "user" ? "flex-end" : "flex-start", backgroundColor: msg.type === "user" ? "#007AFF" : "#ddd", padding: 10, borderRadius: 10 }}>
            <Text style={{ color: msg.type === "user" ? "#fff" : "#000" }}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      <TextInput
        style={{ height: 50, backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 }}
        placeholder="Enter your symptoms..."
        value={symptoms}
        onChangeText={setSymptoms}
      />

      <TouchableOpacity onPress={handleDiagnosis} style={{ backgroundColor: "#007AFF", padding: 15, borderRadius: 10, alignItems: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Get Diagnosis</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatbotScreen;
