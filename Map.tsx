import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";


const MapScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>This is the Map page</Text>
            <Pressable onPress={() => navigation.navigate("CarDetails")}>
                <Text>Car details</Text>
            </Pressable>
        </View>
    )
}

export default MapScreen;