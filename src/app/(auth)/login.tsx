
import { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { router } from "expo-router";

export default function Login() {
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

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Replace navigation stack so user can't go back to auth screens
      router.replace("/(tabs)");
    } catch (err: any) {
      // Log full error for debugging in DevTools
      console.error("Firebase signIn error:", err);

      // Firebase Web SDK errors usually have a `code` property like "auth/invalid-email"
      const code = err?.code ?? null;
      const message = err?.message ?? "An unexpected error occurred";

      // Map common Firebase error codes to friendly messages
      const friendly = {
        "auth/invalid-email": "Invalid email address.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/too-many-requests": "Too many attempts. Try again later.",
      } as Record<string, string>;

      Alert.alert("Login Error", friendly[code] ?? message);
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
        Login
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
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={{ marginBottom: 8 }}
      >
        Login
      </Button>

      <Button mode="text" onPress={() => router.push("/(auth)/register")} disabled={loading}>
        Don't have an account? Register
      </Button>
    </View>
  );
}
