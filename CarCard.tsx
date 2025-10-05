import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { Colors, Border, Spacing, Font } from "./constants";
import { Car } from "./cars"
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface CardProps {
    car: Car;
}


const Card = ({ car }: CardProps) => {
    const navigation = useNavigation();
    const [isRented, setIsRented] = useState(false);

     const load = useCallback(async () => {
        const v = await AsyncStorage.getItem(`rented:${car.id}`);
        setIsRented(v === "true");
      }, [car.id]);

    useEffect(() => {
        load();
      }, [load]);

    useFocusEffect(
        useCallback(() => {
          let active = true;
          (async () => {
            const v = await AsyncStorage.getItem(`rented:${car.id}`);
            if (active) setIsRented(v === "true");
          })();
          return () => {
            active = false;
          };
        }, [car.id])
    );

    return (
        <View style={styles.card}>
            <Image style={styles.image}source={car.image}></Image>
            <View style={styles.infobox}>
                <Text style={styles.header}>{car.name}</Text>
                <Text style={styles.description}>{car.distance} miles away</Text>
                <Text style={styles.description}>Per hour: ${car.price}</Text>

                {isRented ? <Text style={styles.rentedBadge}>RENTED</Text> : null}

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