import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { cars } from "./cars";
import { Border, Colors, Spacing } from "./constants";


const CarDetailsScreen: React.FC = () => {
    
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
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Rent</Text>
                </Pressable>
            </View>
            <View style={styles.box}>
                <Text>Showing more details for {car.name}</Text>
                <Text>Fuel type: {car.specs.fuelType}</Text>
                <Text>Acceleration: {car.specs.acceleration}</Text>
            </View>
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
        fontSize: 20
    },
    button: {
        backgroundColor: Colors.accent,
        paddingVertical: Spacing.small,
        paddingHorizontal: Spacing.large,
        borderRadius: Border.round
    }
})