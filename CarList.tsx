import { View, FlatList, StyleSheet, Alert } from "react-native";
import Card from "./CarCard";
import { Colors, Spacing } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

const apiURL = "https://raw.githubusercontent.com/mikkel1510/react-native-app/main/data.json";


const CarListScreen: React.FC = () => {

    const [data, setData] = useState<any[]>([]);
    const [status, setStatus] = useState<string>("");
   
    const storeKey = "cars";
   
    const fetchData = async () => {
       try {
         setStatus("Fetching...");
         const res = await fetch(apiURL);
         const json = await res.json();
         const list = Array.isArray(json) ? json : (json?.cars ?? []);
         setData(list);
         await AsyncStorage.setItem(storeKey, JSON.stringify(list));
       } catch (e: any) {
         const msg = `Fetch failed: ${String(e?.message || e)}`;
         setStatus(msg);
         Alert.alert("Error", msg);
       }
     };
   
   
     useEffect(() => {
       (async () => {
         await fetchData();
       })();
     }, []
     );
   
     useFocusEffect(
       React.useCallback(() => {
         fetchData();
         return () => {};
       }, [])
     );
     
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
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