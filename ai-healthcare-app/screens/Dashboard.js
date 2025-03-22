import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const [heartbeatData, setHeartbeatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const userId = "123"; // Replace with actual user ID
    fetch(`http://localhost:5000/api/heartbeat/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setHeartbeatData(data.heartbeat || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Heartbeat Trends</Text>

      {/* Navigation Buttons */}
      <Button title="Go to Chatbot" onPress={() => navigation.navigate("Chatbot")} />
      <View style={styles.buttonSpacing} />
      <Button title="Go to Recommendations" onPress={() => navigation.navigate("Recommendations")} />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : heartbeatData.length > 0 ? (
        <LineChart
          data={{
            labels: heartbeatData.map((_, index) => (index % 5 === 0 ? index.toString() : "")),
            datasets: [{ data: heartbeatData }],
          }}
          width={350}
          height={220}
          yAxisSuffix=" bpm"
          chartConfig={{
            backgroundColor: "#f8f9fa",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#f8f9fa",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 10 },
            propsForDots: { r: "4", strokeWidth: "2", stroke: "#ff0000" },
          }}
          bezier
          style={styles.chart}
        />
      ) : (
        <Text style={styles.noData}>No heartbeat data available</Text>
      )}

      {heartbeatData.length > 0 && (
        <Text style={styles.heartbeat}>❤️ Current: {heartbeatData.slice(-1)[0]} bpm</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f8f9fa", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  chart: { borderRadius: 10, marginVertical: 10 },
  noData: { fontSize: 16, color: "gray", marginTop: 10 },
  heartbeat: { fontSize: 20, fontWeight: "bold", color: "red", marginTop: 10 },
  buttonSpacing: { marginVertical: 10 },
});

export default Dashboard;
