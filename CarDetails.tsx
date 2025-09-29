import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";


const CarDetailsScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>This is the car details page</Text>
        </View>
    )
}

export default CarDetailsScreen;