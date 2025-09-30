import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { Colors, Border, Spacing, Font } from "./constants";
import { Car } from "./cars"
import { useNavigation } from "@react-navigation/native";


interface CardProps {
    car: Car;
}


const Card = ({ car }: CardProps) => {
    const navigation = useNavigation();
    return (
        <View style={styles.card}>
            <Image style={styles.image}source={car.image}></Image>
            <View style={styles.infobox}>
                <Text style={styles.header}>{car.name}</Text>
                <Text style={styles.description}>{car.distance} miles away</Text>
                <Text style={styles.description}>Per hour: ${car.price}</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate("CarDetails", { carId: car.id })}>
                    <Text style={styles.buttonText}>See more</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: Border.round,
        padding: Spacing.large,
        flexDirection: 'row',
        marginHorizontal: Spacing.large,
        justifyContent: 'space-between'
    },
    image: {
        height: 150, 
        width: 150, 
        resizeMode: "contain"
    },
    button: {
        backgroundColor: Colors.accent,
        borderRadius: Border.round,
        padding: Spacing.small
    },
    buttonText: {
        color: Colors.text,
        fontSize: 20,
        paddingHorizontal: Spacing.small,
        fontWeight: 'bold'
    },
    header: {
        fontSize: 25,
    },
    description: {
        fontSize: 15,
    },
    infobox: {
        alignItems: 'flex-end',
        gap: Spacing.small,
    }
});