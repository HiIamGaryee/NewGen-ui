import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const userId = "123"; // Replace with actual user ID

  useEffect(() => {
    fetch(`https://your-api-url.com/api/chatbot/history/${userId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data.history || []))
      .catch((error) => console.error("Error fetching chat history:", error));
  }, []);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    fetch("https://your-api-url.com/api/chatbot/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, message: inputMessage }),
    })
      .then((response) => response.json())
      .then((data) => setMessages([...messages, { text: inputMessage, response: data.reply }]))
      .catch((error) => console.error("Error sending message:", error));

    setInputMessage("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.userMessage}>You: {item.text}</Text>
            <Text style={styles.botMessage}>Bot: {item.response}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  messageContainer: { marginBottom: 10 },
  userMessage: { fontWeight: "bold", color: "blue" },
  botMessage: { fontWeight: "bold", color: "green" },
  input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
});

export default Chatbot;
