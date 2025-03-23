import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Login successful!");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Login Error", "Unable to connect to the server.");
    }

    navigation.navigate("Dashboard"); // Navigate to Dashboard in all cases
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Don't have an account?{" "}
        <Text style={styles.registerLink} onPress={() => navigation.navigate("SignUpV2")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#001F3F",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    color: "#333",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  button: {
    width: "100%",
    backgroundColor: "#002147",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    color: "#555",
    marginTop: 20,
    fontSize: 14,
  },
  registerLink: {
    color: "#002147",
    fontWeight: "bold",
  },
});

export default Login;