import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { router } from "expo-router";

export default function Profile() {
  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" }}>
      <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>
        Profile
      </Text>

      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
}