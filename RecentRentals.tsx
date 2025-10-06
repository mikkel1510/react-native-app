// RecentRentals.tsx
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors, Font, Spacing, Border } from "./constants";
import ButtonComponent from "./components/ButtonComponent";

const mockRentals = [
  {
    id: "1",
    car: "Tesla Model 3",
    date: "Sep 28 - Oct 2, 2025",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
    price: "$420 total",
  },
  {
    id: "2",
    car: "BMW X5",
    date: "Aug 14 - Aug 17, 2025",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c8a2e9e4c?auto=format&fit=crop&w=800&q=80",
    price: "$380 total",
  },
  {
    id: "3",
    car: "Audi A4",
    date: "Jul 5 - Jul 8, 2025",
    image:
      "https://images.unsplash.com/photo-1589395595558-48d7c3b86c76?auto=format&fit=crop&w=800&q=80",
    price: "$350 total",
  },
];

const STORAGE_KEY = "user_rental_ratings";

const RecentRentalsScreen: React.FC = () => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  // 🔹 Load saved ratings on mount
  useEffect(() => {
    const loadRatings = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setRatings(JSON.parse(stored));
      } catch (err) {
        console.warn("Failed to load saved ratings:", err);
      }
    };
    loadRatings();
  }, []);

  // 🔹 Save ratings whenever they change
  const saveRatings = async (updatedRatings: { [key: string]: number }) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRatings));
    } catch (err) {
      console.warn("Failed to save ratings:", err);
    }
  };

  const handleRate = (id: string, stars: number) => {
    const updated = { ...ratings, [id]: stars };
    setRatings(updated);
    saveRatings(updated);
  };

  const renderStars = (id: string) => {
    const rating = ratings[id] || 0;
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((num) => (
          <Pressable key={num} onPress={() => handleRate(id, num)}>
            <Text style={[styles.star, num <= rating && styles.starFilled]}>
              ★
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={mockRentals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoBox}>
              <Text style={styles.header}>{item.car}</Text>
              <Text style={styles.description}>{item.date}</Text>
              <Text style={styles.description}>{item.price}</Text>
              {renderStars(item.id)}
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.medium }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default RecentRentalsScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: Spacing.medium,
  },
  listContainer: {
    paddingHorizontal: Spacing.large,
  },
  card: {
    backgroundColor: "white",
    borderRadius: Border.round,
    padding: Spacing.large,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: "contain",
    borderRadius: Border.round,
  },
  infoBox: {
    alignItems: "flex-end",
    gap: Spacing.small,
    flex: 1,
    marginLeft: Spacing.medium,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    fontFamily: Font.font,
  },
  description: {
    fontSize: 15,
    color: Colors.text,
    opacity: 0.85,
    fontFamily: Font.font,
  },
  starsRow: {
    flexDirection: "row",
    marginTop: Spacing.small,
  },
  star: {
    fontSize: 22,
    color: "#ccc",
    marginHorizontal: 2,
  },
  starFilled: {
    color: Colors.accent,
  },
});
