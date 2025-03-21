import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const userId = "123"; // Replace with actual user ID

  useEffect(() => {
    fetch(`https://your-api-url.com/api/recommendations/${userId}`)
      .then((response) => response.json())
      .then((data) => setRecommendations(data.recommendations || []))
      .catch((error) => console.error("Error fetching recommendations:", error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏥 Health Recommendations</Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.recommendation}>• {item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  recommendation: { fontSize: 16, marginVertical: 5 },
});

export default Recommendations;
