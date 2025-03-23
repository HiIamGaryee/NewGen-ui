import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Linking } from 'react-native';

const Chatbot = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const medicalDatabase = [
    { symptoms: ['fever', 'cough', 'tiredness'], diagnosis: "It appears you may have a common flu. Stay hydrated, rest well, and monitor your symptoms. If they worsen, consider seeing a doctor." },
    { symptoms: ['chest pain', 'shortness of breath', 'dizziness'], diagnosis: "Your symptoms could indicate a serious heart condition. Please seek immediate medical attention. Calling 999 now is advisable." },
    { symptoms: ['headache', 'blurred vision', 'weakness'], diagnosis: "These could be signs of high blood pressure or a neurological issue. It is best to consult a healthcare professional soon." },
    { symptoms: ['abdominal pain', 'nausea', 'vomiting'], diagnosis: "This could be related to food poisoning or digestive issues. Stay hydrated and rest. If symptoms persist, seek medical advice." },
    { symptoms: ['skin rash', 'itching', 'swelling'], diagnosis: "This may be an allergic reaction. Avoid potential allergens and take antihistamines if necessary. Seek medical help if symptoms worsen." },
  ];

  const analyzeSymptoms = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();
    for (const condition of medicalDatabase) {
      if (condition.symptoms.some(symptom => lowerCaseInput.includes(symptom))) {
        return condition.diagnosis;
      }
    }
    return "I'm unable to provide an exact diagnosis based on the given symptoms. I strongly recommend consulting a healthcare professional for a more precise assessment.";
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      const response = analyzeSymptoms(input);
      setMessages([...newMessages, { text: response, sender: 'bot' }]);

      if (response.includes('Calling 999 now')) {
        Alert.alert('Emergency Alert', 'Your symptoms indicate an emergency. Would you like to call 999 now?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Call 999', onPress: () => Linking.openURL('tel:999') }
        ]);
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Health Assistant</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Describe your symptoms..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, backgroundColor: '#fff' },
  sendButton: { marginLeft: 10, backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
  messageBubble: { padding: 12, borderRadius: 10, marginVertical: 5, maxWidth: '80%' },
  userBubble: { backgroundColor: '#007bff', alignSelf: 'flex-end' },
  botBubble: { backgroundColor: '#e9ecef', alignSelf: 'flex-start' },
  messageText: { color: '#000', fontSize: 16 },
});

export default Chatbot;
