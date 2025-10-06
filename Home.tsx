// Home.tsx
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import { Colors, Spacing, Border, Font } from "./constants";

const heroImg =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"; // car photo

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top bar: logo + settings */}
        <View style={styles.topRow}>
          <Text style={styles.logo}>ABOVE</Text>
          <Pressable onPress={() => navigation.navigate("Settings" as never)}>
            <Text style={styles.gear}>⚙️</Text>
          </Pressable>
        </View>

        {/* HERO with background image */}
        <ImageBackground
          source={{ uri: heroImg }}
          style={styles.hero}
          imageStyle={styles.heroImg}
        >
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Rent a Car</Text>
            <Text style={styles.heroSub}>Browse, compare, reserve</Text>
            <Pressable
              style={[styles.btn, styles.btnAccent]}
              onPress={() => navigation.navigate("Cars" as never)}
            >
              <Text style={[styles.btnText, styles.btnAccentText]}>
                Explore Cars
              </Text>
            </Pressable>
          </View>
        </ImageBackground>

        {/* Quick actions */}
        <View style={styles.row}>
          {/* Recent rentals — placeholder */}
          <Pressable
            style={[styles.tile, styles.tilePrimary]}
            onPress={() => {
              navigation.navigate("RecentRentals" as never);
            }}
          >
            <Text style={styles.tileTitle}>Recent rentals</Text>
            <Text style={styles.tileText}>See your last bookings</Text>
          </Pressable>

          {/* Support — placeholder, red color */}
          <Pressable
            style={[styles.tile, styles.tileSupport]}
            onPress={() => {
              console.log("Support screen not yet implemented");
            }}
          >
            <Text style={styles.tileTitle}>Support</Text>
            <Text style={styles.tileText}>We’re here to help</Text>
          </Pressable>
        </View>

        {/* Info card */}
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Tip</Text>
          <Text style={styles.infoText}>
            Prices vary by location. Check the Cars page for nearby deals.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: {
    padding: Spacing.medium,
    gap: Spacing.medium,
    paddingBottom: Spacing.large,
  },

  /* Top bar */
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.small,
  },
  logo: {
    color: Colors.text,
    fontSize: Font.large,
    fontWeight: "900",
    letterSpacing: 2,
    // use a heavier/condensed system face to feel like a wordmark
    fontFamily: Platform.select({
      ios: "AvenirNext-DemiBold",
      android: "sans-serif-condensed",
      default: Font.font,
    }),
  },
  gear: { fontSize: 26 },

  /* HERO */
  hero: {
    height: 220,
    borderRadius: Border.round,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  heroImg: { borderRadius: Border.round },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroContent: {
    padding: Spacing.medium,
    alignItems: "center",
    gap: Spacing.small,
  },
  heroTitle: {
    color: "#fff",
    fontFamily: Font.font,
    fontSize: Font.xlarge,
    fontWeight: "800",
  },
  heroSub: {
    color: "#fff",
    opacity: 0.9,
    fontSize: Font.small,
    fontFamily: Font.font,
    textAlign: "center",
  },

  /* CTA inside hero */
  btn: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    borderRadius: Border.round,
    marginTop: Spacing.small,
  },
  btnAccent: { backgroundColor: Colors.accent },
  btnAccentText: {
    color: "#fff",
    fontFamily: Font.font,
    fontWeight: "700",
    fontSize: Font.medium,
  },
  btnText: { fontFamily: Font.font },

  /* Quick action tiles */
  row: { flexDirection: "row", gap: Spacing.medium },
  tile: {
    flex: 1,
    borderRadius: Border.round,
    padding: Spacing.medium,
  },
  tilePrimary: { backgroundColor: Colors.primary },
  tileSupport: { backgroundColor: Colors.accent },
  tileTitle: {
    color: Colors.text,
    fontSize: Font.medium,
    fontWeight: "700",
    fontFamily: Font.font,
  },
  tileText: {
    color: Colors.text,
    opacity: 0.85,
    fontSize: Font.small,
    fontFamily: Font.font,
    marginTop: 4,
  },

  /* Info card */
  info: {
    backgroundColor: "#fff",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: Border.round,
    padding: Spacing.medium,
  },
  infoTitle: {
    color: Colors.text,
    fontSize: Font.small,
    fontWeight: "700",
    fontFamily: Font.font,
    marginBottom: 2,
  },
  infoText: {
    color: Colors.text,
    opacity: 0.9,
    fontSize: Font.small,
    fontFamily: Font.font,
  },
});