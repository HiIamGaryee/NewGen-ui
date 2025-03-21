import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LineChart } from "react-native-svg-charts";

const Dashboard = () => {
  const [heartbeat, setHeartbeat] = useState(72); // Default BPM
  const [heartbeatData, setHeartbeatData] = useState([72]); // Store heartbeat trends

  useEffect(() => {
    const interval = setInterval(() => {
      const newBeat = Math.max(60, Math.min(100, heartbeat + (Math.random() * 4 - 2))); // Simulated sensor data
      setHeartbeat(newBeat);
      setHeartbeatData((prev) => [...prev.slice(-15), newBeat]); // Keep last 15 values
    }, 2000);
    return () => clearInterval(interval);
  }, [heartbeat]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Dashboard</Text>

      {/* Heartbeat Section */}
      <View style={styles.card}>
        <Text style={styles.label}>Heartbeat:</Text>
        <Text style={styles.value}>{heartbeat.toFixed(1)} BPM</Text>
      </View>

      {/* Heartbeat Graph */}
      <View style={styles.graphContainer}>
        <Text style={styles.graphLabel}>Heartbeat Trends</Text>
        <LineChart
          style={styles.graph}
          data={heartbeatData}
          svg={{ stroke: "red", strokeWidth: 2 }}
          contentInset={{ top: 10, bottom: 10 }}
        />
      </View>

      {/* Additional Health Info */}
      <View style={styles.card}>
        <Text style={styles.label}>Blood Pressure:</Text>
        <Text style={styles.value}>120/80 mmHg</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Oxygen Level:</Text>
        <Text style={styles.value}>98%</Text>
      </View>

      {/* Simulated Sensor Button */}
      <TouchableOpacity style={styles.button} onPress={() => setHeartbeat(72)}>
        <Text style={styles.buttonText}>Reset Heartbeat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  label: { fontSize: 18, fontWeight: "bold" },
  value: { fontSize: 20, color: "#ff4500", fontWeight: "bold" },
  graphContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  graphLabel: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  graph: { height: 150 },
  button: { marginTop: 20, backgroundColor: "#007BFF", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default Dashboard;
