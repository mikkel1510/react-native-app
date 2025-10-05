import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {Colors, Fonts, Spacing} from './constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import SettingsScreen from './Settings'
import CarListScreen from './CarList'
import CarDetailsScreen from './CarDetails'
import MapScreen from './Map';
import { RentalProvider } from './RentalContext';

const Stack = createStackNavigator()

export default function App() {
  
  return (
    <RentalProvider>
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
                <Pressable onPress={() => navigation.navigate("Map")} style={styles.button}>
                  <Image style={styles.icon} source={require('./assets/Map.png')}></Image>
                </Pressable>
              )
              })}
          />
          <Stack.Screen name="CarDetails" component={CarDetailsScreen}/>
          <Stack.Screen name="Map" component={MapScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RentalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
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
