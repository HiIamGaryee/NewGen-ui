import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Chatbot = ({ navigation }) => {  // Add navigation as prop
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant Chatbot</Text>
      <Text style={styles.subtitle}>How can I help you today?</Text>
      
      {/* Add Chatbot logic here */}
      
      {/* Back button to return to Health screen */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Health Screen</Text>
      </TouchableOpacity>

      {/* New Button to navigate somewhere else (for example, Chatbot functionality) */}
      <TouchableOpacity style={styles.newButton} onPress={() => alert("Navigate to new functionality!")}>
        <Text style={styles.newButtonText}>Go to New Functionality</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", color: "#6c757d", marginVertical: 20 },
  backButton: { backgroundColor: "#003366", padding: 10, borderRadius: 5, marginTop: 20 },
  backButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },
  newButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5, marginTop: 20 },  // New button
  newButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});

export default Chatbot;
