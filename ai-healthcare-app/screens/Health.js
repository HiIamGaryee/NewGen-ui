import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const Health = ({ navigation }) => {
  const { t } = useTranslation();
  const API_KEY = process.env.EXPO_PUBLIC_API_URL;

  const availableMedicines = [
    "Vitamin C",
    "Vitamin D",
    "Multi-Vitamin",
    "Calcium",
    "Omega-3",
    "B-6 Vitamin",
    "Garlic-Plus",
    "Other",
  ];
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [customMedicine, setCustomMedicine] = useState("");
  const [reminderTime, setReminderTime] = useState(new Date());
  const [medicineData, setMedicineData] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    fetchRemindersFromAPI();
  }, []);

  // A) Fetch all reminders from the server
  const fetchRemindersFromAPI = async () => {
    try {
      const response = await fetch(`${API_KEY}/api/medicine/set-med`, {
        method: "GET",
        credentials: "include", // important for session
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch reminders");
      }

      const transformed = data.reminders.map((r) => ({
        name: r.medicineName,
        time: r.reminderTime,
        id: r._id,
      }));

      setMedicineData(transformed);
    } catch (error) {
      console.error("Fetch Reminders Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  // B) Add a new reminder on the server
  const addReminderToAPI = async (medicineName, reminderTimeString) => {
    try {
      const response = await fetch(`${API_KEY}/api/medicine/set-med`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medicineName,
          reminderTime: reminderTimeString,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add reminder");
      }
      // data.reminder is the newly created reminder
      console.log("Reminder added to server:", data.reminder);
    } catch (error) {
      console.error("Add Reminder Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  const onTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      setReminderTime(selectedDate);
    }
    setShowTimePicker(false);
  };

  // 2) Add a new reminder (locally + server)
  const addReminder = async () => {
    const medicineName =
      selectedMedicine === "Other" ? customMedicine : selectedMedicine;
    if (!medicineName) return;

    // Convert reminderTime to a string (e.g. "09:45")
    const timeString = reminderTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // 2A) First, add to the server
    try {
      await addReminderToAPI(medicineName, timeString);

      // 2B) Then, re-fetch the updated list from server
      await fetchRemindersFromAPI();
    } catch (error) {
      // already handled in addReminderToAPI
    }

    // 2C) Clear local states
    setSelectedMedicine("");
    setCustomMedicine("");
    setReminderTime(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("medicine_reminder")}</Text>
      <Text style={styles.subtitle}>{t("medicine_reminder_description")}</Text>
      <Text style={styles.selectLabel}>{t("select_medicine")}</Text>
      <View style={styles.medicineInputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t("choose_medicine_placeholder")}
          value={selectedMedicine}
          onFocus={() => setSelectedMedicine("")}
        />
      </View>
      <View style={styles.medicineList}>
        {availableMedicines.map((medicine, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.medicineOption,
              selectedMedicine === medicine && styles.selectedMedicine,
            ]}
            onPress={() => setSelectedMedicine(medicine)}
          >
            <Text style={styles.medicineText}>{medicine}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedMedicine === "Other" && (
        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          placeholder={t("medicine_placeholder")}
          value={customMedicine}
          onChangeText={setCustomMedicine}
        />
      )}
      <Text style={styles.selectLabel}>{t("set_reminder_time")}</Text>
      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Ionicons name="time-outline" size={20} color="#fff" />
        <Text style={styles.timeButtonText}>
          {reminderTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          display="clock"
          value={reminderTime}
          onChange={onTimeChange}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={addReminder}>
        <Text style={styles.addButtonText}>{t("add_reminder")}</Text>
      </TouchableOpacity>
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
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => navigation.navigate("Chatbot")}
      >
        <Text style={styles.chatbotButtonText}>{t("go_to_aichatbox")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f4f8" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f8c8d",
    marginBottom: 20,
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#34495e",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  medicineInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  medicineList: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  medicineOption: { padding: 10, borderRadius: 5, backgroundColor: "#ecf0f1" },
  selectedMedicine: { backgroundColor: "#007AFF" },
  medicineText: { color: "#2c3e50" },
  timeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  timeButtonText: { color: "#fff", fontSize: 16, marginLeft: 10 },
  addButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  medicineItem: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowOpacity: 0.1,
    elevation: 3,
    marginBottom: 10,
  },
  medicineName: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
  medicineTime: { fontSize: 16, color: "#6c757d" },
  chatbotButton: {
    backgroundColor: "#003366",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  chatbotButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});

export default Health;
