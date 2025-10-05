import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Colors, Spacing, Border, Font } from "./constants";

const heroImg =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"; // car photo

// sticky bar: shape of the data we expect from CarDetails
type ActiveRental = {
  carId: number;
  carName: string;
  thumbnail: any; // Image source (require(...) or { uri })
  endsAt: string; // ISO string
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();

  // sticky bar: local state (shows only when not null)
  const [activeRental, setActiveRental] = useState<ActiveRental | null>(null);

  // sticky bar: read params sent from CarDetails whenever Home gains focus
  useFocusEffect(
    React.useCallback(() => {
      const p = route?.params ?? {};
      if (p.clearActiveRental) {
        setActiveRental(null);
        (navigation as any).setParams?.({ clearActiveRental: undefined }); // cast to any
      } else if (p.activeRental) {
        setActiveRental(p.activeRental as ActiveRental);
        (navigation as any).setParams?.({ activeRental: undefined }); // cast to any
      }
    }, [route, navigation])
  );

  // sticky bar: small formatter for how much time is left
  const timeLeftLabel = (iso: string) => {
    const end = new Date(iso).getTime();
    const m = Math.max(0, Math.floor((end - Date.now()) / 60000));
    if (m <= 0) return "Ends now";
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return h ? `${h}h ${mm}m left` : `${mm} min left`;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* top bar: logo + settings */}
        <View style={styles.topRow}>
          <Text style={styles.logo}>ABOVE</Text>
          <Pressable onPress={() => (navigation as any).navigate("Settings")}>
            <Text style={styles.gear}>⚙️</Text>
          </Pressable>
        </View>

        {/* hero with image and CTA */}
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
              onPress={() => (navigation as any).navigate("Cars")}
            >
              <Text style={[styles.btnText, styles.btnAccentText]}>
                Explore Cars
              </Text>
            </Pressable>
          </View>
        </ImageBackground>

        {/* quick actions */}
        <View style={styles.row}>
          <Pressable
            style={[styles.tile, styles.tilePrimary]}
            onPress={() => {
              // placeholder for a future RecentRentals screen
              console.log("Recent Rentals not implemented yet");
            }}
          >
            <Text style={styles.tileTitle}>Recent rentals</Text>
            <Text style={styles.tileText}>See your last bookings</Text>
          </Pressable>

          <Pressable
            style={[styles.tile, styles.tileSupport]}
            onPress={() => {
              // placeholder for a future Support screen
              console.log("Support not implemented yet");
            }}
          >
            <Text style={styles.tileTitle}>Support</Text>
            <Text style={styles.tileText}>We’re here to help</Text>
          </Pressable>
        </View>

        {/* info card */}
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Tip</Text>
          <Text style={styles.infoText}>
            Prices vary by location. Check the Cars page for nearby deals.
          </Text>
        </View>
      </ScrollView>

      {/* sticky bar: only render when we have an active rental */}
      {activeRental && (
        <View style={styles.nowPlayingWrap}>
          <Pressable
            style={styles.rentalBar}
            onPress={() =>
              (navigation as any).navigate("CarDetails", {
                carId: activeRental.carId,
              })
            }
          >
            <Image source={activeRental.thumbnail} style={styles.rentalThumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rentalTitle} numberOfLines={1}>
                {activeRental.carName}
              </Text>
              <Text style={styles.rentalSub} numberOfLines={1}>
                {timeLeftLabel(activeRental.endsAt)}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>
      )}
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

  // top bar
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
    fontFamily: Platform.select({
      ios: "AvenirNext-DemiBold",
      android: "sans-serif-condensed",
      default: Font.font,
    }),
  },
  gear: { fontSize: 26 },

  // hero
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

  // CTA in hero
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

  // tiles
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

  // info card
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

  // sticky bar
  nowPlayingWrap: {
    position: "absolute",
    left: Spacing.medium,
    right: Spacing.medium,
    bottom: Spacing.medium,
  },
  rentalBar: {
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
  rentalThumb: {
    width: 56,
    height: 56,
    borderRadius: Border.round,
    resizeMode: "cover",
    backgroundColor: Colors.primary,
  },
  rentalTitle: {
    fontFamily: Font.font,
    fontSize: Font.small,
    color: Colors.text,
    fontWeight: "700",
  },
  rentalSub: {
    fontFamily: Font.font,
    fontSize: Font.small,
    color: Colors.text,
    opacity: 0.8,
  },
  chevron: {
    fontSize: 28,
    color: Colors.text,
    opacity: 0.6,
    paddingHorizontal: Spacing.small,
  },
});
