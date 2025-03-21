import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function AnalysisBoard() {
  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 50 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Health Analysis</Text>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{ data: [60, 80, 75, 90, 85, 95] }],
        }}
        width={350}
        height={220}
        yAxisLabel=""
        yAxisSuffix=" BPM"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    </View>
  );
}
