import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";


const CarListScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>This is the Cars page</Text>
            <Pressable onPress={() => navigation.navigate('CarDetails')}>
                <Text>Car Details</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Map')}>
                <Text>Map</Text>
            </Pressable>
        </View>
    )
}

export default CarListScreen;