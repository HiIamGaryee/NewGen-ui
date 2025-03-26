import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTranslation } from "react-i18next"; 

const Health = () => {
  const { t } = useTranslation(); 

  const [exerciseMinutes, setExerciseMinutes] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async () => {
    if (!exerciseMinutes || !waterIntake || !weight) {
      Alert.alert(t("error"), t("fill_all_fields")); 
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/health/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "abc123", // For demo purposes
          date: new Date().toISOString(),
          exerciseMinutes: parseInt(exerciseMinutes),
          waterIntake: parseFloat(waterIntake),
          weight: parseFloat(weight),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(t("success"), t("health_data_saved")); 
      } else {
        Alert.alert(t("error"), data.message || t("something_wrong")); 
      }
    } catch (error) {
      console.error("Submission Error:", error);
      Alert.alert(t("error"), t("server_error")); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("health_input_title")}</Text> 

      <TextInput
        style={styles.input}
        placeholder={t("exercise_minutes")} 
        placeholderTextColor="#999"
        value={exerciseMinutes}
        onChangeText={setExerciseMinutes}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder={t("water_intake")} 
        placeholderTextColor="#999"
        value={waterIntake}
        onChangeText={setWaterIntake}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder={t("weight")} 
        placeholderTextColor="#999"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("submit")}</Text> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#002147",
  },
  input: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    color: "#333",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  button: {
    width: "100%",
    backgroundColor: "#002147",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Health;
