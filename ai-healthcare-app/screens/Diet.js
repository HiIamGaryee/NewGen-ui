import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";

const Diet = () => {
  const [selectedPreference, setSelectedPreference] = useState("Balanced");
  const [vegetables, setVegetables] = useState("");
  const [meats, setMeats] = useState("");
  const [mealPlan, setMealPlan] = useState({ breakfast: "", lunch: "", dinner: "" });

  // Meal Plan Suggestions
  const mealSuggestions = {
    Balanced: {
      breakfast: "Oatmeal with banana 🍌",
      lunch: "Grilled chicken & rice 🍗",
      dinner: "Salmon with quinoa 🐟",
    },
    Vegetarian: {
      breakfast: "Smoothie bowl 🍓",
      lunch: "Vegetable stir-fry 🍛",
      dinner: "Lentil soup & bread 🍞",
    },
    Keto: {
      breakfast: "Omelet with spinach 🍳",
      lunch: "Grilled steak & avocado 🥑",
      dinner: "Salmon with butter sauce 🐟",
    },
  };

  // Generate Meal Plan
  const generateMealPlan = () => {
    if (!vegetables || !meats) {
      Alert.alert("Error", "Please enter your favorite vegetables and meats.");
      return;
    }
    setMealPlan(mealSuggestions[selectedPreference]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personalized Diet Plan 🍽️</Text>

      {/* Dietary Preferences */}
      <Text style={styles.subtitle}>Select Your Dietary Preference:</Text>
      <View style={styles.optionsContainer}>
        {Object.keys(mealSuggestions).map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.optionButton, selectedPreference === option && styles.selectedOption]}
            onPress={() => setSelectedPreference(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* User Preferences */}
      <Text style={styles.subtitle}>Your Favorite Vegetables:</Text>
      <TextInput style={styles.input} placeholder="e.g., Broccoli, Carrot..." value={vegetables} onChangeText={setVegetables} />

      <Text style={styles.subtitle}>Your Favorite Meats:</Text>
      <TextInput style={styles.input} placeholder="e.g., Chicken, Beef..." value={meats} onChangeText={setMeats} />

      {/* Generate Meal Plan */}
      <TouchableOpacity style={styles.darkBlueButton} onPress={generateMealPlan}>
        <Text style={styles.darkBlueButtonText}>Get Meal Plan 🍽️</Text>
      </TouchableOpacity>

      {/* Display Meal Plan */}
      {mealPlan.breakfast ? (
        <View style={styles.mealContainer}>
          <Text style={styles.mealTitle}>Meal Plan for the Day:</Text>
          <Text style={styles.mealText}>🥞 Breakfast: {mealPlan.breakfast}</Text>
          <Text style={styles.mealText}>🥗 Lunch: {mealPlan.lunch}</Text>
          <Text style={styles.mealText}>🍛 Dinner: {mealPlan.dinner}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "#000" },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8, color: "#000" },
  optionsContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  optionButton: { padding: 10, margin: 5, borderRadius: 20, borderWidth: 1, borderColor: "#007bff", backgroundColor: "#fff" },
  selectedOption: { backgroundColor: "#007bff" },
  optionText: { fontSize: 16, color: "#000" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 10, marginBottom: 10, backgroundColor: "#fff", color: "#000" },
  darkBlueButton: { marginTop: 20, padding: 15, backgroundColor: "#003366", borderRadius: 10, alignItems: "center" },
  darkBlueButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  mealContainer: { marginTop: 20, padding: 15, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  mealTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 5, color: "#000" },
  mealText: { fontSize: 16, marginVertical: 2, color: "#000" },
});

export default Diet;
