

import { useState } from "react";
import { View, Alert, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { auth, db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { pickAndUploadImage } from "../../services/uploadimage";

export default function AddListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  const handlePickImage = async () => {
    const url = await pickAndUploadImage();
    if (url) setImage(url);
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Not signed in", "You must be signed in to post a listing.");
      return;
    }
    if (!title || !price) {
      Alert.alert("Validation", "Please provide a title and price.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "marketplace"), {
        title,
        price,
        description,
        image,
        ownerId: user.uid,
        createdAt: new Date(),
        phone: user.phoneNumber || "27800000000",
      });

      Alert.alert("Success", "Listing created!");

      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);
    } catch (e) {
      console.error("Create listing error:", e);
      Alert.alert("Error", "Could not create listing. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 28, marginBottom: 20 }}>
        Create Listing
      </Text>

      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <TextInput label="Price" value={price} onChangeText={setPrice} />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button onPress={handlePickImage} style={{ marginTop: 10 }}>
        Pick Image
      </Button>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: 200, marginTop: 10 }}
        />
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{ marginTop: 20 }}
        loading={loading}
        disabled={loading}
      >
        Post Listing
      </Button>
    </View>
  );
}
