import { Image, StyleSheet, Text, View } from 'react-native';
import {Colors, Fonts, Spacing} from './constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import SettingsScreen from './Settings'
import CarListScreen from './CarList'
import CarDetailsScreen from './CarDetails'
import MapScreen from './Map';
import ButtonComponent from './components/ButtonComponent';

const Stack = createStackNavigator()

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Settings" component={SettingsScreen}/>
        <Stack.Screen 
          name="Cars" 
          component={CarListScreen} 
          options={({ navigation }) => ({
            title: 'Cars',
            headerRight: () => (
              <ButtonComponent onPress={() => navigation.navigate("Map")} icon={require("./assets/Map.png")} backgroundColor='transparent'/>
            )
            })}
        />
        <Stack.Screen name="CarDetails" component={CarDetailsScreen}/>
        <Stack.Screen name="Map" component={MapScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Fonts.xlarge,
    fontWeight: "bold",
    color: Colors.text,
  },
  icon: {
    height: 30, 
    width: 30, 
    resizeMode: "contain",
  },
  button: {
    padding: Spacing.medium
  }
});
