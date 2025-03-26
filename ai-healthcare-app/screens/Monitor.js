import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert, Modal, TextInput, TouchableOpacity } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;

const Health = () => {
  const { t } = useTranslation();
  const [heartRateModal, setHeartRateModal] = useState(false);
  const [stepsModal, setStepsModal] = useState(false);
  const [caloriesModal, setCaloriesModal] = useState(false);

  const [heartRateData, setHeartRateData] = useState([72, 75, 78, 80, 76, 74, 72]);
  const [stepsData, setStepsData] = useState([5000, 6000, 5500, 7000, 7500, 6800, 7200]);
  const [caloriesData, setCaloriesData] = useState([2000, 1800]);

  const [heartRateInput, setHeartRateInput] = useState(Array(7).fill(""));
  const [stepsInput, setStepsInput] = useState(Array(7).fill(""));
  const [caloriesInput, setCaloriesInput] = useState(["", ""]);

  const updateHeartRate = () => {
    const newValues = heartRateInput.map(value => parseInt(value) || 0);
    if (newValues.some(val => val === 0)) {
      Alert.alert(t("error"), t("please_enter_valid_data"));
      return;
    }
    setHeartRateData(newValues);
    setHeartRateModal(false);
  };

  const updateSteps = () => {
    const newValues = stepsInput.map(value => parseInt(value) || 0);
    if (newValues.some(val => val === 0)) {
      Alert.alert(t("error"), t("please_enter_valid_data"));
      return;
    }
    setStepsData(newValues);
    setStepsModal(false);
  };

  const updateCalories = () => {
    const newValues = caloriesInput.map(value => parseInt(value) || 0);
    if (newValues.some(val => val === 0)) {
      Alert.alert(t("error"), t("please_enter_valid_data"));
      return;
    }
    setCaloriesData(newValues);
    setCaloriesModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("report_title")}</Text>
      <Text style={styles.subtitle}>{t("report_subtitle")}</Text>

      {/* Heart Rate Section */}
      <TouchableOpacity style={styles.button} onPress={() => setHeartRateModal(true)}>
        <Text style={styles.buttonText}>{t("Enter Heart Rate Data")}</Text>
      </TouchableOpacity>
      <LineChart
        data={{ labels: [t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat"), t("sun")], datasets: [{ data: heartRateData }] }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix={` ${t("bpm")}`}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
      <Modal visible={heartRateModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Enter Weekly Heart Rate")}</Text>
            {heartRateInput.map((value, index) => (
              <View key={index} style={styles.inputRow}>
                <Text style={styles.dayLabel}>
                  {t(["MON", "TUES", "WED", "THURS", "FRI", "SATUR", "SUN"][index])}:
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={text => {
                    let newInput = [...heartRateInput];
                    newInput[index] = text;
                    setHeartRateInput(newInput);
                  }}
                />
              </View>
            ))}
            <TouchableOpacity style={styles.submitButton} onPress={updateHeartRate}>
              <Text style={styles.buttonText}>{t("submit")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Steps Section */}
      <TouchableOpacity style={styles.button} onPress={() => setStepsModal(true)}>
        <Text style={styles.buttonText}>{t("Enter Steps Data")}</Text>
      </TouchableOpacity>
      <LineChart
        data={{ labels: [t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat"), t("sun")], datasets: [{ data: stepsData }] }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix={` ${t("steps")}`}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
      <Modal visible={stepsModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Enter Weekly Steps")}</Text>
            {stepsInput.map((value, index) => (
              <View key={index} style={styles.inputRow}>
                <Text style={styles.dayLabel}>
                  {t(["MON", "TUES", "WED", "THURS", "FRI", "SATUR", "SUN"][index])}:
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={text => {
                    let newInput = [...stepsInput];
                    newInput[index] = text;
                    setStepsInput(newInput);
                  }}
                />
              </View>
            ))}
            <TouchableOpacity style={styles.submitButton} onPress={updateSteps}>
              <Text style={styles.buttonText}>{t("submit")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Calories Section */}
      <TouchableOpacity style={styles.button} onPress={() => setCaloriesModal(true)}>
        <Text style={styles.buttonText}>{t("Enter Calories Data")}</Text>
      </TouchableOpacity>
      <ProgressChart data={{ data: [caloriesData[0] / 3000, caloriesData[1] / 3000] }} width={screenWidth - 40} height={200} strokeWidth={16} radius={32} chartConfig={chartConfig} hideLegend={false} style={styles.chart} />
      <Modal visible={caloriesModal} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t("Enter Calories Data")}</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={t("0")}
              value={caloriesInput[0]}
              onChangeText={text => setCaloriesInput([text, caloriesInput[1]])}
            />
            <Text style={styles.label}>{t("Burned")}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={t("0")}
              value={caloriesInput[1]}
              onChangeText={text => setCaloriesInput([caloriesInput[0], text])}
            />
            <Text style={styles.label}>{t("Consumed")}</Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={updateCalories}>
            <Text style={styles.buttonText}>{t("submit")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </ScrollView>
  );
};
const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#f5f5f5",
  backgroundGradientTo: "#dfe4ea",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: "6", strokeWidth: "2", stroke: "#007AFF" },
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#6c757d", marginBottom: 20 },
  button: { backgroundColor: "#00008B", padding: 10, borderRadius: 8, alignSelf: "center", marginBottom: 10 },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  chartTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  chart: { borderRadius: 16, alignSelf: "center" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" },
  modalContent: { width: 320, backgroundColor: "white", padding: 20, borderRadius: 16, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  inputRow: { flexDirection: "row", alignItems: "center",justifyContent: "space-between", marginBottom: 10 },
  dayLabel: { fontSize: 16, fontWeight: "bold",marginRight: 10, width: 60 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 5, borderRadius: 8, width: 100, textAlign: "center" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: { backgroundColor: "#00008B", padding: 10, borderRadius: 8, marginTop: 10, width: "100%", alignItems: "center" },
  label: {fontSize: 16,fontWeight: "bold",marginLeft: 10,
  },
});

export default Health;