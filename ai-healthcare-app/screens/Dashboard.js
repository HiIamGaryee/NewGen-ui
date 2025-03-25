import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Svg, { Polyline } from "react-native-svg";
import GoogleFit, { Scopes } from "react-native-google-fit";
import UserProfile from "../services/UserProfile";

const Dashboard = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [heartbeat, setHeartbeat] = useState(67); // Default heart rate

  // Simulate heartbeat changes every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeartbeat = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Random bpm between 60-100
      setHeartbeat(newHeartbeat);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = parseFloat(height) / 100;
      const bmiValue = (
        parseFloat(weight) /
        (heightInMeters * heightInMeters)
      ).toFixed(2);
      setBmi(bmiValue);
      determineBMICategory(bmiValue);
    }
  };

  const determineBMICategory = (bmi) => {
    let category = "";
    if (bmi < 18.5) {
      category = "Underweight 😕";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Healthy Weight ✅";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight ⚠️";
    } else {
      category = "Obese ❌";
    }
    setBmiCategory(category);
  };

  const fetchHeartRate = () => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_HEART_RATE_READ,
      ],
    };

    GoogleFit.authorize(options).then((authResult) => {
      if (authResult.success) {
        GoogleFit.getHeartRateSamples({
          startDate: "2025-03-20T00:00:17.971Z", // ISO format
          endDate: new Date().toISOString(),
        }).then((res) => {
          if (res.length > 0) {
            setHeartbeat(res[res.length - 1].value);
          }
        });
      } else {
        console.log("Google Fit authorization failed");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Dashboard</Text>
      <UserProfile />

      {/* Heartbeat Graph */}
      <Svg height="100" width="300" style={styles.heartbeatGraph}>
        <Polyline
          points="0,50 20,30 40,70 60,20 80,50 100,30 120,70 140,20 160,50"
          fill="none"
          stroke="red"
          strokeWidth="2"
        />
      </Svg>

      <Text style={styles.heartbeatText}>Heartbeat: {heartbeat} bpm ❤️</Text>

      {/* BMI Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      {/* Calculate BMI Button */}
      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>

      {/* Test Button to Fetch Heart Rate */}
      <TouchableOpacity style={styles.testButton} onPress={fetchHeartRate}>
        <Text style={styles.testButtonText}>Test Heartbeat</Text>
      </TouchableOpacity>

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.bmiText}>Your BMI: {bmi}</Text>
          <Text style={styles.bmiCategory}>{bmiCategory}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  heartbeatGraph: { marginBottom: 10 },
  heartbeatText: { fontSize: 18, color: "red", marginBottom: 20 },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultContainer: { marginTop: 10, alignItems: "center" },
  bmiText: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  bmiCategory: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "#002147",
  },
  button: {
    width: "60%",
    backgroundColor: "#002147",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  testButton: {
    width: "40%",
    backgroundColor: "#002147",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  testButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default Dashboard;