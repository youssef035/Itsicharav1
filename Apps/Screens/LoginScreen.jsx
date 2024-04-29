import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCCpjaPeaMzFq0sOXS_Oq8PvnbmDH7w0WQ",
  authDomain: "istichara-90d21.firebaseapp.com",
  projectId: "istichara-90d21",
  storageBucket: "istichara-90d21.appspot.com",
  messagingSenderId: "927063032999",
  appId: "1:927063032999:web:d7a04fd8232c611f888782",
  measurementId: "G-WQ5KLJRJJ4",
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth();

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully:", userCredential.user.uid);
      // Handle authentication success, navigation, etc.
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    fontSize: 15,
    textAlign: "center",
    color: "#007BFF",
  },
});

export default LoginScreen;
