import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { cars, CarSpecs, labels } from "./cars";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Border, Colors, Font, Spacing } from "./constants";

import Modal from "react-native-modal";
import RentalPopup from "./RentalPopup";
import { useRental } from "./RentalContext";



const CarDetailsScreen: React.FC = () => {

    const route = useRoute();
    const { carId } = route.params as {carId: number}
    const car = cars.find((c) => c.id === carId);

    if (!car){
        return (
            <Text>Car not found!</Text>
        )
    }

    const [isPopUpVisible, setPopUpVisible] = useState(false)
    const togglePopUp = () => {
        setPopUpVisible(!isPopUpVisible);
    }

    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())

    const { rentedCar, setRentedCar } = useRental();
    const [isRented, setRented] = useState(rentedCar == car.id)
      
      const storageKey = `rented:${carId}`;

    useEffect(() => {
      const getStored = async () => {
        const v = await AsyncStorage.getItem(storageKey);
        if (v) setRented(v === "true");
      };
      getStored();
    }, [storageKey]);

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

            // log for testing
            const savedId = await AsyncStorage.getItem("currentRental");
            const savedName = await AsyncStorage.getItem("currentRentalName");
            console.log("Saved currentRental:", savedId, savedName);

        } else {
          const current = await AsyncStorage.getItem("currentRental");
          if (current === String(carId)) {
            await AsyncStorage.multiRemove(["currentRental", "currentRentalName"]);

            // log for testing
            console.log("Cleared currentRental");
          }
        }

      setPopUpVisible(false);
    } catch (e: any) {
          console.error("confirmRent save failed:", e);
    }

    const rent = (startDate: Date, timePeriod: string) => {
        setStartTime(startDate)
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
        setRentedCar(car.id)
    }
    
    const toggleRented = () => {
        if (rentedCar != null){
            setRentedCar(null)
        }
        setRented(!isRented);
        setPopUpVisible(!isPopUpVisible)
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.box}>
                <Text style={styles.header}>{car.name}</Text>
                <Image style={styles.image} source={car.image}></Image>
                
                { !isRented ? (
                    <View>
                    { rentedCar ? (
                        <Pressable style={[styles.button, {backgroundColor: Colors.secondary}]} onPress={togglePopUp} disabled={true}>
                            <Text style={styles.buttonText}>Already rented a car</Text>
                        </Pressable>
                    ) : (
                        <Pressable style={[styles.button, {backgroundColor: Colors.confirm}]} onPress={togglePopUp}>
                            <Text style={styles.buttonText}>Rent</Text>
                            <Image source={require("./assets/CalendarIcon.png")} style={{ width: 35, height: 35 }}></Image>
                        </Pressable>
                    ) 
                }
                    </View> 
                ) : (
                    <View style={{ gap: Spacing.medium }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.medium }}>
                                <Text style={{ fontWeight: 'bold' }}>Rented from: </Text>
                                <Text>{startTime.toLocaleString()}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.medium }}>
                                <Text style={{ fontWeight: 'bold' }}>Until: </Text>
                                <Text>{endTime.toLocaleString()}</Text>
                            </View>
                        </View>
                        <Pressable style={styles.button} onPress={togglePopUp}>
                            <Text style={styles.buttonText}>End rental</Text>
                            <Image source={require("./assets/CalendarIcon.png")} style={{ width: 35, height: 35 }}></Image>
                        </Pressable>
                    </View>
                )}
            </View>

            <View style={[styles.box, { alignItems: 'stretch' }]}>
                {(Object.keys(car.specs) as (keyof CarSpecs)[]).map((key) => (
                    <View style={styles.infoRow} key={key}>
                        <Text style={{ fontFamily: Font.font }}>
                            {labels[key]}:
                        </Text>
                        <Text style={{ fontFamily: Font.font }}>
                            {car.specs[key]}
                        </Text>
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
    )
}

export default CarDetailsScreen;

const styles = StyleSheet.create({
    container: {
        padding: Spacing.large,
        gap: Spacing.medium
    },
    box: {
        backgroundColor: 'white',
        borderRadius: Border.round,
        padding: Spacing.medium,
        alignItems: 'center'
    },
    image: {
        height: 150,
        width: 220,
        resizeMode: "contain"
    },
    header: {
        fontSize: 30,
        fontFamily: Font.font
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Font.font
    },
    button: {
        backgroundColor: Colors.accent,
        paddingVertical: Spacing.small,
        paddingHorizontal: Spacing.large,
        borderRadius: Border.round,
        flexDirection: 'row',
        alignItems: 'center'
    },
    popup: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 600,
        borderRadius: Border.round,
        overflow: 'visible'
    },
    popupRow: {
        flexDirection: 'row',
        gap: Spacing.small,
        justifyContent: 'center',
        margin: Spacing.medium
    },
    calendar: {
        height: 500,
        resizeMode: "contain",
        justifyContent: 'flex-start',
        padding: Spacing.large,
        paddingTop: 130,
        top: -70,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
