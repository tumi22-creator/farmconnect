import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    });

    return unsub;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" }}>
      <ActivityIndicator size="large" color="#22c55e" />
    </View>
  );
}