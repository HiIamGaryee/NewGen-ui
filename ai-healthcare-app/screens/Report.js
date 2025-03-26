import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";
import AiHealthReport from "../services/AiHealthReport";

const screenWidth = Dimensions.get("window").width;

const Health = () => {
  const { t } = useTranslation();

  // Dummy health data (can be replaced with actual API data)
  const healthData = {
    heartRate: [72, 75, 78, 80, 76, 74, 72], // Heart rate over time
    steps: [3000, 4500, 6000, 7000, 8500, 10000, 12000], // Steps over a week
    calories: 0.6, // 60% of daily goal achieved
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("report_title")}</Text>
      <Text style={styles.subtitle}>{t("report_subtitle")}</Text>

      {/* Heart Rate Line Chart */}
      <Text style={styles.chartTitle}>{t("heart_rate")}</Text>
      <LineChart
        data={{
          labels: [
            t("mon"),
            t("tue"),
            t("wed"),
            t("thu"),
            t("fri"),
            t("sat"),
            t("sun"),
          ],
          datasets: [{ data: healthData.heartRate }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix={` ${t("bpm")}`}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Steps Progress Chart */}
      <Text style={styles.chartTitle}>{t("daily_steps")}</Text>
      <LineChart
        data={{
          labels: [
            t("mon"),
            t("tue"),
            t("wed"),
            t("thu"),
            t("fri"),
            t("sat"),
            t("sun"),
          ],
          datasets: [{ data: healthData.steps }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix={` ${t("steps")}`}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Calories Progress Chart */}
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

// Chart styling
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6c757d",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  chart: { borderRadius: 16, alignSelf: "center" },
});

export default Health;
