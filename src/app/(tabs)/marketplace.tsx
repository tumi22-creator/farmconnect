

import { useEffect, useState } from "react";
import { View, FlatList, Image, Linking } from "react-native";
import { Card, Text, Button } from "react-native-paper";

import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Marketplace() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "marketplace"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setListings(data);
    });

    return unsub;
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 28, marginBottom: 20 }}>
        Marketplace
      </Text>

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 15 }}>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: 200 }}
              />
            )}

            <Card.Title title={item.title} subtitle={`R ${item.price}`} />

            <Card.Content>
              <Text>{item.description}</Text>

              <Button
                mode="contained"
                onPress={() => {
                  const phone = item.phone || "27800000000";
                  const message = `Hi, I'm interested in ${item.title}`;
                  Linking.openURL(
                    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
                  );
                }}
                style={{ marginTop: 12 }}
              >
                Contact Seller
              </Button>

              {item.ownerId === auth.currentUser?.uid && (
                <Button
                  onPress={async () => {
                    try {
                      await deleteDoc(doc(db, "marketplace", item.id));
                    } catch (e) {
                      console.error("Delete listing error:", e);
                    }
                  }}
                  style={{ marginTop: 8 }}
                >
                  Delete
                </Button>
              )}
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
