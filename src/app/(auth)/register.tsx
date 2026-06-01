import { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { router } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please enter both email and password.");
      return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation", "Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Validation", "Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Successful registration — replace navigation stack so user can't go back to auth screens
      router.replace("/(tabs)");
    } catch (err: any) {
      // Log full error for debugging
      console.error("Firebase createUser error:", err);

      // Map common Firebase error codes to friendly messages
      const code = err?.code ?? "";
      const friendly: Record<string, string> = {
        "auth/email-already-in-use": "An account with this email already exists.",
        "auth/invalid-email": "Invalid email address.",
        "auth/operation-not-allowed": "Email/password accounts are not enabled in Firebase.",
        "auth/weak-password": "Password is too weak. Use at least 6 characters.",
        "auth/too-many-requests": "Too many attempts. Try again later.",
      };

      Alert.alert("Registration Error", friendly[code] ?? err?.message ?? "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#0f172a",
      }}
    >
      <Text
        variant="headlineMedium"
        style={{
          color: "white",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Register
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 15 }}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        style={{ marginBottom: 8 }}
      >
        Create Account
      </Button>

      <Button mode="text" onPress={() => router.push("/(auth)/login")} disabled={loading}>
        Already have an account? Login
      </Button>
    </View>
  );
}
