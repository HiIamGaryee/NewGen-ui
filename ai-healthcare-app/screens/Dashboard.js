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
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import UserProfile from "../services/UserProfile";

GoogleSignin.configure({
  webClientId: "YOUR_WEB_CLIENT_ID", // Replace with your Web Client ID from Google Cloud Console
  offlineAccess: true,
});

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [heartbeat, setHeartbeat] = useState(67); // Default heart rate

  useEffect(() => {
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const userInfo = await GoogleSignin.getCurrentUser();
        setUser(userInfo);
      }
    } catch (error) {
      console.error("Error checking sign-in status", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else {
        console.error("Google Sign-in error", error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeartbeat = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
      setHeartbeat(newHeartbeat);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchHeartRate = () => {
    if (!user) {
      alert("Please sign in with Google first.");
      return;
    }
    
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
          startDate: "2025-03-20T00:00:17.971Z",
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
      
      {!user ? (
        <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text>Welcome, {user.user.name}</Text>
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
          
          <Svg height="100" width="300" style={styles.heartbeatGraph}>
            <Polyline
              points="0,50 20,30 40,70 60,20 80,50 100,30 120,70 140,20 160,50"
              fill="none"
              stroke="red"
              strokeWidth="2"
            />
          </Svg>

          <Text style={styles.heartbeatText}>Heartbeat: {heartbeat} bpm ❤️</Text>

          <TouchableOpacity style={styles.testButton} onPress={fetchHeartRate}>
            <Text style={styles.testButtonText}>Test Heartbeat</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  heartbeatGraph: { marginBottom: 10 },
  heartbeatText: { fontSize: 18, color: "red", marginBottom: 20 },
  button: {
    width: "60%",
    backgroundColor: "#4285F4",
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
