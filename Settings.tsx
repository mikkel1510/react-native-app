import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";


const SettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>This is the Settings page</Text>
        </View>
    )
}

export default SettingsScreen;