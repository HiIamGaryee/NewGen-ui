import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
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
        setProfile(data);
      } else {
        Alert.alert(
          "Profile Error",
          data.message || "Failed to fetch profile data."
        );
      }
    } catch (error) {
      console.error("Fetch Profile Error:", error);
      Alert.alert("Network Error", "Unable to connect to the server.");
    }
  };

  return (
    <View style={styles.container}>
      {profile ? (
        <View>
          <Text style={styles.profileText}>Hello, {profile.username}!</Text>
          <Text>Email: {profile.email}</Text>
          <Text>Username: {profile.username}</Text>
          <Text>Gender: {profile.gender}</Text>
          <Text>Age: {profile.age}</Text>
          {profile.heartbeat && <Text>Heartbeat: {profile.heartbeat} BPM</Text>}
        </View>
      ) : (
        <Text>Loading profile...</Text>
      )}
      <Button title="Refresh Profile" onPress={fetchProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default UserProfile;
