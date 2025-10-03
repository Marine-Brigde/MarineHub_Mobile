import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const response = await fetch(
      "https://marine-bridge.orbitmap.vn/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail,
          password,
        }),
      }
    );

    const data = await response.json();
    console.log("Login Response:", data);

    if (!response.ok || data.status !== 200) {
      Alert.alert("Login failed", data.message || "Invalid credentials");
      return;
    }

    if (data.data && data.data.accessToken) {
      await AsyncStorage.setItem("token", String(data.data.accessToken));
      await AsyncStorage.setItem("username", data.data.username);
      await AsyncStorage.setItem("email", data.data.email);
      await AsyncStorage.setItem("role", data.data.role);

      Alert.alert("Success", data.message || "Login successful!");
      navigation.replace("Home"); // Đúng tên route
    } else {
      Alert.alert("Error", "No accessToken returned from server!");
    }
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};


  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/a7/d8/01/a7d801430b69f32d0622cb4cf7b9f782.jpg",
      }}
      style={styles.background}
      blurRadius={3}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Maritime Management</Text>
        <Text style={styles.subtitle}>
          Making a difference in Ocean and Maritime
        </Text>

        <View style={styles.card}>
          <Text style={styles.loginTitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChangeText={setUsernameOrEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={{ color: "#555" }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLink}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>Powered by asm®</Text>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#e0e0e0",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: "100%",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#003d66",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  registerLink: {
    color: "#003d66",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    color: "#fff",
    fontSize: 12,
  },
});
