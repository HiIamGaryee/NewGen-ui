import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t("error"), t("fill_email_password"));
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        Alert.alert(t("success"), t("login_success"), [
          {
            text: "OK",
            onPress: () => navigation.replace("Dashboard"),
          },
        ]);
      } else {
        setErrorMessage(result.message || t("invalid_credentials"));
        Alert.alert(t("login_failed"), result.message || t("invalid_credentials"));
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert(t("login_error"), t("server_error"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("login")}</Text>

      <TextInput
        style={styles.input}
        placeholder={t("email")}
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={t("password")}
        placeholderTextColor="#555"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        {t("no_account")} {" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("SignUpV2")}
        >
          {t("sign_up")}
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
  errorText: {
    color: "#ff0000",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Login;
