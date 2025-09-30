import { View, FlatList, StyleSheet } from "react-native";
import Card from "./CarCard";
import { cars } from "./cars";
import { Colors, Spacing } from "./constants";


const CarListScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={cars}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Card car={item}></Card>}
                ItemSeparatorComponent={() => <View style={{ height: Spacing.medium }} />}
            />
        </View>
    )
}

export default CarListScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        height: '100%' 
    }
})