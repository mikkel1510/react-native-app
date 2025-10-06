import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { Colors, Border, Spacing, Font, Fonts } from "./constants";
import { Car } from "./cars"
import { useNavigation } from "@react-navigation/native";


interface CardProps {
    car: Car;
}


const Card = ({ car }: CardProps) => {
    const navigation = useNavigation();
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image style={styles.image}source={car.image}></Image>
            </View>
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
        flex: 1,
        width: '90%',
        height: '900%',
        resizeMode: "contain"
    },
    imageContainer: {
        flex: 1
    },
    button: {
        backgroundColor: Colors.accent,
        borderRadius: Border.round,
        padding: Spacing.small
    },
    buttonText: {
        color: Colors.text,
        fontSize: Font.medium,
        paddingHorizontal: Spacing.small,
        fontWeight: 'bold',
        fontFamily: Font.font
    },
    header: {
        fontSize: Font.large,
        fontFamily: Font.font
    },
    description: {
        fontSize: Font.small,
        fontFamily: Font.font
    },
    infobox: {
        alignItems: 'flex-end',
        gap: Spacing.small,
        padding: Spacing.small
    }
});