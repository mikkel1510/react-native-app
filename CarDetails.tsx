import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Border, Colors, Font, Spacing } from "./constants";
import Modal from "react-native-modal";
import RentalPopup from "./RentalPopup";
import { useRental } from "./RentalContext";
import { CarSpecs, labels } from "./cars";
import ButtonComponent from "./components/ButtonComponent";

const CarDetailsScreen: React.FC = () => {
  const route = useRoute();
  const { carId } = route.params as { carId: number };

  const [car, setCar] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isRented, setRented] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const { rentedCar, setRentedCar } = useRental();
  const storageKey = `rented:${carId}`;

  useEffect(() => {
    const loadCar = async () => {
      try {
        const storedCars = await AsyncStorage.getItem("cars");
        if (storedCars) {
          const parsed = JSON.parse(storedCars);
          const found = Array.isArray(parsed)
            ? parsed.find((c) => c.id === carId)
            : parsed.cars?.find((c: any) => c.id === carId);

          setCar(found || null);
        } else {
          setCar(null);
        }

        const rentedStatus = await AsyncStorage.getItem(storageKey);
        setRented(rentedStatus === "true");
      } catch (e) {
        console.error("Error loading car:", e);
      } finally {
        setLoading(false);
      }
    };
    loadCar();
  }, [carId]);

  const togglePopUp = () => setPopUpVisible(!isPopUpVisible);

  const confirmRent = async () => {
    try {
      const next = !isRented;
      setRented(next);
      await AsyncStorage.setItem(storageKey, String(next));

      if (next) {
        await AsyncStorage.multiSet([
          ["currentRental", String(carId)],
          ["currentRentalName", car?.name ?? ""],
        ]);
        console.log("Saved currentRental:", carId, car?.name);
      } else {
        const current = await AsyncStorage.getItem("currentRental");
        if (current === String(carId)) {
          await AsyncStorage.multiRemove(["currentRental", "currentRentalName"]);
          console.log("Cleared currentRental");
        }
      }
      setPopUpVisible(false);
    } catch (e) {
      console.error("confirmRent save failed:", e);
    }
  };

  const rent = (startDate: Date, timePeriod: string) => {
    setStartTime(startDate);
    switch (timePeriod) {
      case "1":
        setEndTime(new Date(startDate.getTime() + 1 * 60 * 60 * 1000));
        break;
      case "6":
        setEndTime(new Date(startDate.getTime() + 6 * 60 * 60 * 1000));
        break;
      case "24":
        setEndTime(new Date(startDate.getTime() + 24 * 60 * 60 * 1000));
        break;
    }
    toggleRented();
    confirmRent();
    setRentedCar(car.id);
  };

  const toggleRented = () => {
    if (rentedCar != null) {
      setRentedCar(null);
    }
    setRented(!isRented);
    setPopUpVisible(!isPopUpVisible);
  };

  if (loading) {
    return (

      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Colors.accent} />
        <Text>Loading car details...</Text>
      </View>
    );
  }

  if (!car) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Car not found!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.header}>{car.name}</Text>
        <Image
          style={styles.image}
          source={{ uri: car.image }}
        />

    {!isRented ? (
  <View>
    {rentedCar ? (
      <ButtonComponent
        label="Already rented a car"
        backgroundColor={Colors.secondary}
        textColor="#fff"
        disabled={true}
      />
    ) : (
      <ButtonComponent
        label="Rent"
        icon={require("./assets/CalendarIcon.png")}
        backgroundColor={Colors.confirm}
        onPress={togglePopUp}
      />
    )}
  </View>
) : (
  <View style={{ gap: Spacing.medium }}>
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: Spacing.medium }}>
        <Text style={{ fontWeight: "bold" }}>Rented from:</Text>
        <Text>{startTime.toLocaleString()}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: Spacing.medium }}>
        <Text style={{ fontWeight: "bold" }}>Until:</Text>
        <Text>{endTime.toLocaleString()}</Text>
      </View>
    </View>

    <ButtonComponent
      label="End rental"
      icon={require("./assets/CalendarIcon.png")}
      backgroundColor={Colors.accent}
      onPress={togglePopUp}
    />
  </View>
)}


      <View style={[styles.box, { alignItems: "stretch" }]}>
        {(Object.keys(car.specs) as (keyof CarSpecs)[]).map((key) => (
          <View style={styles.infoRow} key={key}>
            <Text style={{ fontFamily: Font.font }}>{labels[key]}:</Text>
            <Text style={{ fontFamily: Font.font }}>{car.specs[key]}</Text>
          </View>
        ))}
      </View>


      <Modal isVisible={isPopUpVisible} backdropColor="grey">
        <RentalPopup
          isRented={isRented}
          carName={car.name}
          toggleRented={toggleRented}
          rent={rent}
          togglePopUp={togglePopUp}
        />
      </Modal>
    </View>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing.large,
    gap: Spacing.medium,
    flex: 1,
    backgroundColor: Colors.background,
  },
  box: {
    backgroundColor: "white",
    borderRadius: Border.round,
    padding: Spacing.medium,
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 220,
    resizeMode: "contain",
  },
  header: {
    fontSize: 30,
    fontFamily: Font.font,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Font.font,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.large,
    borderRadius: Border.round,
    flexDirection: "row",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
