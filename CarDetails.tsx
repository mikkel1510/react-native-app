import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { cars, CarSpecs, labels } from "./cars";
import { Border, Colors, Spacing } from "./constants";
import { useState } from "react";
import Modal from "react-native-modal";
import ButtonComponent from "./components/ButtonComponent";


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
                

                <ButtonComponent onPress={togglePopUp} label="Rent" icon={require("./assets/CalendarIcon.png")}/>

                <Text>Rented: {isRented ? "true" : "false"}</Text>
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
                <View style={styles.popup}>
                        <ImageBackground source={require("./assets/Calendar.png")} style={styles.calendar}>
                            <View style={{ alignItems: 'center'}}>
                                <Text style={styles.header}>{car.name}</Text>
                            </View>
                            <View style={{ paddingTop: 50 }}>
                                <View style={[styles.popupRow, { justifyContent: 'space-between' }]}>
                                    <Text>Period</Text>
                                    <Text>Enddate</Text>
                                </View>
                                <View style={[styles.popupRow, { justifyContent: 'space-between' }]}>
                                    <Text>Time</Text>
                                    <Text>END</Text>
                                </View>    
                            </View>
                        </ImageBackground>
                    
                        <View style={styles.popupRow}>
                            <ButtonComponent onPress={toggleRented} label="Confirm" backgroundColor={Colors.confirm}/>
                            <ButtonComponent onPress={togglePopUp} label="Cancel" backgroundColor={Colors.background} textColor={Colors.text}/>
                        </View>
                </View>
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
})