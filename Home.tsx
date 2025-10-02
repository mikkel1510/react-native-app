import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Pressable } from "react-native";


const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>This is the Home page</Text>
            <Pressable onPress={() => navigation.navigate('Settings')}>
                <Text>Settings page</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Cars')}>
                <Text>Cars page</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Map')}>
                <Text>Go to Map</Text>
            </Pressable>
        </View>
    )
}

export default HomeScreen;