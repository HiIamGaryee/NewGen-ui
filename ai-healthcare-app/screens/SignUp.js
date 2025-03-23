import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const genders = ["Male", "Female"];

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword || !gender || !age) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const userData = {
      username,
      email,
      password,
      gender,
      age: parseInt(age), // Convert age to number
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "User registered successfully");
        navigation.replace("Dashboard"); // Navigate to Dashboard on success
      } else {
        Alert.alert("Registration Failed", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Unable to connect to the server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Gender Selection */}
      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={gender ? styles.inputText : styles.placeholderText}>
          {gender || "Select Gender"}
        </Text>
      </TouchableOpacity>

      {/* Gender Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={genders}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => {
                    setGender(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.genderText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#999"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
          Login
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
  inputText: {
    color: "#333",
    fontSize: 16,
  },
  placeholderText: {
    color: "#999",
    fontSize: 16,
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
  loginText: {
    color: "#555",
    marginTop: 20,
    fontSize: 14,
  },
  loginLink: {
    color: "#002147",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  genderOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  genderText: {
    fontSize: 18,
    color: "#333",
  },
  cancelText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

export default SignUp;
