import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data.user);
      } else {
        Alert.alert("Profile Error", data.message || "Failed to fetch profile data.");
      }
    } catch (error) {
      console.error("Fetch Profile Error:", error);
      Alert.alert("Network Error", "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#002147" />
      ) : profile ? (
        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>Hello, {profile.username}!</Text>
          <Text style={styles.profileInfo}>📧 Email: {profile.email}</Text>
          <Text style={styles.profileInfo}>👤 Username: {profile.username}</Text>
          <Text style={styles.profileInfo}>⚧ Gender: {profile.gender}</Text>
          <Text style={styles.profileInfo}>🎂 Age: {profile.age}</Text>
          {profile.heartbeat && (
            <Text style={styles.profileInfo}>❤️ Heartbeat: {profile.heartbeat} BPM</Text>
          )}
        </View>
      ) : (
        <Text style={styles.errorText}>Failed to load profile.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={fetchProfile}>
        <Text style={styles.buttonText}>Refresh Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "90%",
    alignItems: "center",
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#002147",
    marginBottom: 10,
  },
  profileInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#002147",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfile;