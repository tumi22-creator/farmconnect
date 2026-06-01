import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import { auth, db } from "../../services/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Planner() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  const user = auth.currentUser;

  // LOAD TASKS REAL TIME
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "tasks"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setTasks(list);
    });

    return unsub;
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!task || !user) return;

    await addDoc(collection(db, "users", user.uid, "tasks"), {
      text: task,
      createdAt: new Date(),
    });

    setTask("");
  };

  // DELETE TASK
  const deleteTask = async (id: string) => {
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "tasks", id));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 28, marginBottom: 20 }}>
        Planner
      </Text>

      <TextInput
        label="New Task"
        value={task}
        onChangeText={setTask}
        style={{ marginBottom: 10 }}
      />

      <Button mode="contained" onPress={addTask}>
        Add Task
      </Button>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginTop: 15 }}>
            <Card.Content>
              <Text>{item.text}</Text>
              <Button onPress={() => deleteTask(item.id)}>
                Delete
              </Button>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}