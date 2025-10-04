import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { cars, CarSpecs, labels } from "./cars";
import { Border, Colors, Spacing } from "./constants";
import { useState } from "react";
import Modal from "react-native-modal";
import RentalPopup from "./RentalPopup";



const CarDetailsScreen: React.FC = () => {

    const [isPopUpVisible, setPopUpVisible] = useState(false)
    const togglePopUp = () => {
        setPopUpVisible(!isPopUpVisible);
    }

    const [isRented, setRented] = useState(false)
    
    const toggleRented = () => {
        setRented(!isRented);
        setPopUpVisible(!isPopUpVisible)
    }

    const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("")
    const items = [
        { label: "All day", value: "All day" },
        { label: "1 hour", value: "1 hour" },
        { label: "6 hours", value: "6 hours" }
    ]

    const [open, setOpen] = useState(false);

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())

    const route = useRoute();
    const { carId } = route.params as {carId: number}
    const car = cars.find((c) => c.id === carId);

    if (!car){
        return (
            <Text>Car not found!</Text>
        )
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.box}>
                <Text style={styles.header}>{car.name}</Text>
                <Image style={styles.image} source={car.image}></Image>
                
                { !isRented ? (
                    <Pressable style={styles.button} onPress={togglePopUp}>
                        <Text style={styles.buttonText}>Rent</Text>
                        <Image source={require("./assets/CalendarIcon.png")} style={{ width: 35, height: 35 }}></Image>
                    </Pressable>
                ) : (
                    <Pressable style={styles.button} onPress={togglePopUp}>
                        <Text style={styles.buttonText}>End rental</Text>
                        <Image source={require("./assets/CalendarIcon.png")} style={{ width: 35, height: 35 }}></Image>
                    </Pressable>
                )}
            </View>

            <View style={[styles.box, { alignItems: 'stretch' }]}>
                {(Object.keys(car.specs) as (keyof CarSpecs)[]).map((key) => (
                    <View style={styles.infoRow} key={key}>
                        <Text>
                            {labels[key]}:
                        </Text>
                        <Text>
                            {car.specs[key]}
                        </Text>
                    </View>
                ))}
            </View>

            <Modal isVisible={isPopUpVisible} backdropColor="grey">
                <RentalPopup
                    isRented={isRented}
                    carName={car.name}
                    open={open}
                    setOpen={setOpen}
                    selectedTimePeriod={selectedTimePeriod}
                    setSelectedTimePeriod={setSelectedTimePeriod}
                    items={items}
                    date={date}
                    time={time}
                    toggleRented={toggleRented}
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
        fontSize: 30
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: Colors.accent,
        paddingVertical: Spacing.small,
        paddingHorizontal: Spacing.large,
        borderRadius: Border.round,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.medium
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})