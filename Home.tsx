import React from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors, Spacing, Border, Font } from "./constants";
import ButtonComponent from "./components/ButtonComponent";
import { useRental } from "./RentalContext";
import ActiveRentalBar, { ActiveRentalData } from "./ActiveRentalBar";

const heroImg =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { rentedCar } = useRental(); // which car id is rented

  const [active, setActive] = React.useState<ActiveRentalData | null>(null);

  const refreshActive = React.useCallback(async () => {
    if (!rentedCar) {
      setActive(null);
      return;
    }

    try {
      const carsRaw = await AsyncStorage.getItem("cars");
      let car: any | null = null;
      if (carsRaw) {
        const parsed = JSON.parse(carsRaw);
        const list = Array.isArray(parsed) ? parsed : parsed?.cars ?? [];
        car = list.find((c: any) => c.id === rentedCar) || null;
      }

      const endIso =
        (await AsyncStorage.getItem(`rented:${rentedCar}:endTime`)) || null;

      setActive({
        carId: rentedCar,
        carName: car?.name ?? "Current rental",
        imageUri: car?.image ?? null,
        endsAt: endIso ? new Date(endIso) : null,
      });
    } catch (e) {
      console.warn("Active rental load failed:", e);
      setActive(null);
    }
  }, [rentedCar]);

  useFocusEffect(
    React.useCallback(() => {
      refreshActive();
      return () => {};
    }, [refreshActive])
  );

  // sticky bar: tick every 30s so the label updates
  React.useEffect(() => {
    if (!active?.endsAt) return;
    const t = setInterval(() => {
      setActive((prev) =>
        prev ? { ...prev, endsAt: new Date(prev.endsAt!) } : prev
      );
    }, 30_000);
    return () => clearInterval(t);
  }, [active?.endsAt]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top bar: logo + settings */}
        <View style={styles.topRow}>
          <Text style={styles.logo}>ABOVE</Text>
          <ButtonComponent
            onPress={() => navigation.navigate("Settings")}
            icon={require("./assets/gear.png")}
            backgroundColor="transparent"
          />
        </View>

        {/* Hero card with background image */}
        <ImageBackground
          source={{ uri: heroImg }}
          style={styles.hero}
          imageStyle={styles.heroImg}
        >
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Rent a Car</Text>
            <Text style={styles.heroSub}>Browse, compare, reserve</Text>

            <ButtonComponent
              labelStyle={styles.btnAccentText}
              onPress={() => navigation.navigate("Cars")}
              label="Explore Cars"
            />
          </View>
        </ImageBackground>

        {/* Quick actions */}
        <View style={styles.row}>
          <ButtonComponent
            style={[styles.tile, styles.tilePrimary]}
            onPress={() => navigation.navigate("RecentRentals")}
            label="Recent Rentals"
            labelStyle={styles.tileTitle}
            extraText={"See your last bookings"}
            extraTextStyle={styles.tileText}
          />
          <ButtonComponent
            style={[styles.tile, styles.tileSupport]}
            onPress={() => console.log("Support not implemented")}
            label="Support"
            labelStyle={styles.tileTitle}
            extraText={"We're here to help!"}
            extraTextStyle={styles.tileText}
          />
        </View>

        {/* Info card */}
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Tip</Text>
          <Text style={styles.infoText}>
            Prices vary by location. Check the Cars page for nearby deals.
          </Text>
        </View>
      </ScrollView>

      {/* sticky bar: only show if we have a current rental */}
      {active && (
        <View style={styles.nowWrap}>
          <ActiveRentalBar
            data={active}
            onPress={() =>
              navigation.navigate("CarDetails", { carId: active.carId })
            }
          />
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
    paddingBottom: Spacing.large + 80, // make room for active rental bar bar
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
    fontFamily: Platform.select({
      ios: "AvenirNext-DemiBold",
      android: "sans-serif-condensed",
      default: Font.font,
    }),
  },

  /* Hero card */
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
  btnAccentText: {
    color: "#fff",
    fontFamily: Font.font,
    fontWeight: "700",
    fontSize: Font.medium,
  },

  /* Tiles */
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

  /* Active rental bar */
  nowWrap: {
    position: "absolute",
    left: Spacing.medium,
    right: Spacing.medium,
    bottom: Spacing.medium,
  },
});
