import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Colors, Spacing, Border, Font } from "./constants";

export type ActiveRentalData = {
  carId: number;
  carName: string;
  imageUri: string | null; 
  endsAt: Date | null;     
};

type Props = {
  data: ActiveRentalData;
  onPress: () => void; 
};

function timeLeftLabel(endsAt: Date | null) {
  if (!endsAt) return "…"; 
  const diffMs = endsAt.getTime() - Date.now();
  const m = Math.max(0, Math.floor(diffMs / 60000));
  if (m <= 0) return "Ends now";
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return h ? `${h}h ${mm}m left` : `${mm} min left`;
}

const ActiveRentalBar: React.FC<Props> = ({ data, onPress }) => {
  return (
    <Pressable style={styles.wrap} onPress={onPress} accessibilityRole="button">
      {data.imageUri ? (
        <Image source={{ uri: data.imageUri }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.thumbFallback]}>
          <Text style={{ fontSize: 22 }}>🚗</Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>
          {data.carName || "Current rental"}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {timeLeftLabel(data.endsAt)}
        </Text>
      </View>

      <Text style={styles.chev}>›</Text>
    </Pressable>
  );
};

export default ActiveRentalBar;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: Border.round,
    padding: Spacing.small,
    gap: Spacing.small,
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: Border.round,
    backgroundColor: Colors.primary,
    resizeMode: "cover",
  },
  thumbFallback: {
    width: 56,
    height: 56,
    borderRadius: Border.round,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: Font.font,
    fontSize: Font.small,
    color: Colors.text,
    fontWeight: "700",
  },
  sub: {
    fontFamily: Font.font,
    fontSize: Font.small,
    color: Colors.text,
    opacity: 0.85,
  },
  chev: {
    fontSize: 28,
    color: Colors.text,
    opacity: 0.6,
    paddingHorizontal: Spacing.small,
  },
});
