import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { cars } from "./cars";
import { distanceKm, formatKm, LatLng } from "./Math";

type Props = {
  userLoc: LatLng | null; // comes from Map.tsx
};

const CarPin: React.FC<Props> = ({ userLoc }) => {
  const navigation = useNavigation<any>();

  // Compute distance for each car
  const distances = useMemo(() => {
    const map = new Map<number, number | null>();
    for (const car of cars) {
      map.set(car.id, userLoc ? distanceKm(userLoc, car.location) : null);
    }
    return map;
  }, [userLoc]);

  return (
    <>
      {cars.map((car) => {
        const d = distances.get(car.id) ?? null;
        return (
          <Marker
            key={car.id}
            coordinate={car.location}
            title={car.name}
            description={`${car.make} ${car.model}`}
          >
            <Callout
              tooltip={false}
              onPress={() => navigation.navigate("CarDetails", { carId: car.id })}
            >
              <View style={styles.callout}>
                <Text style={styles.title}>{car.name}</Text>
                <Text style={styles.subtitle}>{formatKm(d)}</Text>
                <View style={styles.linkBtn}>
                  <Text style={styles.linkText}>Open car details →</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  callout: {
    width: 220,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 12,
    gap: 4,
  },
  title: { fontWeight: "bold", fontSize: 16 },
  subtitle: { fontSize: 14 },
  linkBtn: {
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#e8f0ff",
    marginTop: 8,
  },
  linkText: { fontWeight: "600" },
});

export default CarPin;
