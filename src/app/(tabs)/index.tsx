import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function Dashboard() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 20 }}>
      
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
        Farm Dashboard
      </Text>

      <Pressable onPress={() => router.push("/(tabs)/marketplace")}>
        <Text style={{ color: "#22c55e", marginTop: 20 }}>
          Go to Marketplace →
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("/(tabs)/planner")}>
        <Text style={{ color: "#22c55e", marginTop: 20 }}>
          Go to Planner →
        </Text>
      </Pressable>

    </View>
  );
}