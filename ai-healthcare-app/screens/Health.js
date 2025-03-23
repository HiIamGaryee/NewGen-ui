import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Health = ({ navigation }) => {
  const availableMedicines = ["Vitamin C", "Multivitamin", "Calcium", "Omega-3"];
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [reminderTime, setReminderTime] = useState(new Date());
  const [medicineData, setMedicineData] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Function to handle time picker change
  const onTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      setReminderTime(selectedDate);
    }
    setShowTimePicker(false);
  };

  // Function to add new medicine reminder
  const addReminder = () => {
    if (!selectedMedicine) return;
    const newReminder = {
      name: selectedMedicine,
      time: reminderTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMedicineData([...medicineData, newReminder]);
    setSelectedMedicine("");
    setReminderTime(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine Intake Reminder</Text>
      <Text style={styles.subtitle}>Don't forget to take your medicine!</Text>

      {/* Select Medicine */}
      <Text style={styles.selectLabel}>Select Medicine</Text>
      <TextInput
        style={styles.input}
        placeholder="Choose your medicine"
        value={selectedMedicine}
        onFocus={() => setSelectedMedicine("")}
      />
      {availableMedicines.map((medicine, index) => (
        <TouchableOpacity
          key={index}
          style={styles.medicineOption}
          onPress={() => setSelectedMedicine(medicine)}
        >
          <Text>{medicine}</Text>
        </TouchableOpacity>
      ))}

      {/* Time Picker */}
      <Text style={styles.selectLabel}>Set Reminder Time</Text>
      <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.timeButtonText}>{reminderTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          display="clock"
          value={reminderTime}
          onChange={onTimeChange}
        />
      )}

      {/* Add Reminder Button */}
      <TouchableOpacity style={styles.addButton} onPress={addReminder}>
        <Text style={styles.addButtonText}>Add Reminder</Text>
      </TouchableOpacity>

      {/* Medicine Reminder List */}
      {medicineData.length > 0 && (
        <FlatList
          data={medicineData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.medicineItem}>
              <Text style={styles.medicineName}>{item.name}</Text>
              <Text style={styles.medicineTime}>{item.time}</Text>
            </View>
          )}
        />
      )}

      {/* Button to navigate to Chatbot */}
      <TouchableOpacity style={styles.chatbotButton} onPress={() => navigation.navigate("Chatbot")}>
        <Text style={styles.chatbotButtonText}>Go to AI Assistant Chatbot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#6c757d", marginBottom: 20 },
  selectLabel: { fontSize: 16, marginVertical: 10 },
  input: { borderWidth: 1, borderColor: "#007AFF", padding: 10, marginBottom: 10, borderRadius: 5 },
  medicineOption: { padding: 10, backgroundColor: "#fff", marginBottom: 5, borderRadius: 5, borderWidth: 1, borderColor: "#007AFF" },
  timeButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5, marginBottom: 20 },
  timeButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },
  addButton: { backgroundColor: "#28a745", padding: 15, borderRadius: 5, marginTop: 20 },
  addButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },
  medicineItem: { padding: 15, backgroundColor: "#ffffff", borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3, marginBottom: 10 },
  medicineName: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
  medicineTime: { fontSize: 16, color: "#6c757d" },
  chatbotButton: { backgroundColor: "#003366", padding: 10, borderRadius: 5, marginTop: 20 },
  chatbotButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});

export default Health;
