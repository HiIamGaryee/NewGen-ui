import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next"; 

const Diet = () => {
  const { t } = useTranslation(); 

  const [selectedPreference, setSelectedPreference] = useState("Balanced");
  const [vegetables, setVegetables] = useState("");
  const [meats, setMeats] = useState("");
  const [mealPlan, setMealPlan] = useState({ breakfast: "", lunch: "", dinner: "" });

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

  const generateMealPlan = () => {
    if (!vegetables || !meats) {
      Alert.alert(t("error"), t("enter_ingredients")); 
      return;
    }
    setMealPlan(mealSuggestions[selectedPreference]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("diet_title")}</Text> 

      <Text style={styles.subtitle}>{t("select_preference")}</Text> 
      <View style={styles.optionsContainer}>
        {Object.keys(mealSuggestions).map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedPreference === option && styles.selectedOption,
            ]}
            onPress={() => setSelectedPreference(option)}
          >
            <Text style={styles.optionText}>{t(option.toLowerCase())}</Text> 
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>{t("fav_vegetables")}</Text> 
      <TextInput
        style={styles.input}
        placeholder={t("veg_placeholder")}
        value={vegetables}
        onChangeText={setVegetables}
      />

      <Text style={styles.subtitle}>{t("fav_meats")}</Text> 
      <TextInput
        style={styles.input}
        placeholder={t("meat_placeholder")}
        value={meats}
        onChangeText={setMeats}
      />

      <TouchableOpacity style={styles.darkBlueButton} onPress={generateMealPlan}>
        <Text style={styles.darkBlueButtonText}>{t("get_meal_plan")}</Text> 
      </TouchableOpacity>

      {mealPlan.breakfast ? (
        <View style={styles.mealContainer}>
          <Text style={styles.mealTitle}>{t("daily_meal_plan")}</Text>
          <Text style={styles.mealText}>{t("breakfast")}: {mealPlan.breakfast}</Text>
          <Text style={styles.mealText}>{t("lunch")}: {mealPlan.lunch}</Text>
          <Text style={styles.mealText}>{t("dinner")}: {mealPlan.dinner}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};
