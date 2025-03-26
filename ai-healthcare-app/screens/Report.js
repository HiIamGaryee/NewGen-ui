import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert, Modal, Image, TouchableOpacity } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";
import AiHealthReport from "../services/AiHealthReport";

const screenWidth = Dimensions.get("window").width;

const Health = () => {
  const { t } = useTranslation();
  const [selectedHeartRate, setSelectedHeartRate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const healthData = {
    heartRate: [72, 75, 78, 80, 76, 74, 72],
    steps: [3000, 4500, 6000, 7000, 8500, 10000, 12000],
    calories: 0.6,
  };

  const checkHeartRateStatus = (heartRate) => {
    const normalRange = { min: 60, max: 100 };
    return heartRate >= normalRange.min && heartRate <= normalRange.max ? t("normal") : t("abnormal");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("report_title")}</Text>
      <Text style={styles.subtitle}>{t("report_subtitle")}</Text>

      <View style={styles.headerContainer}>
        <Text style={styles.chartTitle}>{t("heart_rate")}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>{t("more_info")}</Text>
        </TouchableOpacity>
      </View>

      <LineChart
        data={{
          labels: [t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat"), t("sun")],
          datasets: [{ data: healthData.heartRate }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix={` ${t("bpm")}`}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        onDataPointClick={({ value }) => {
          const status = checkHeartRateStatus(value);
          setSelectedHeartRate(`${value} BPM - ${status}`);
          Alert.alert(t("heart_rate_info"), `${value} BPM - ${status}`);
        }}
      />
      {selectedHeartRate && <Text style={styles.heartRateInfo}>{selectedHeartRate}</Text>}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Image source={require("../assets/image.png")} style={styles.modalImage} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>{t("close")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Text style={styles.chartTitle}>{t("daily_steps")}</Text>
      <LineChart
        data={{
          labels: [t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat"), t("sun")],
          datasets: [{ data: healthData.steps }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix={` ${t("steps")}`}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>{t("calories_burned")}</Text>
      <ProgressChart
        data={{ data: [healthData.calories] }}
        width={screenWidth - 40}
        height={200}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
        style={styles.chart}
      />
      <AiHealthReport />
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
  headerContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 5 },
  chart: { borderRadius: 16, alignSelf: "center" },
  heartRateInfo: { fontSize: 16, textAlign: "center", color: "#007AFF", marginTop: 10 },
  button: { backgroundColor: "#007AFF", padding: 8, borderRadius: 8 },
  buttonText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" },
  modalImage: { width: 300, height: 300, borderRadius: 16 },
  closeButton: { backgroundColor: "#FF3B30", padding: 10, borderRadius: 8, marginTop: 10 },
});

export default Health;
