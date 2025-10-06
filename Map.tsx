import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import CarPin from "./CarPins";
import { LatLng } from "./Math";
import { cars } from "./cars";

const ODENSE_FALLBACK: Region = {
  latitude: 55.3959,
  longitude: 10.3883,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MapScreen: React.FC = () => {
  const [userLoc, setUserLoc] = useState<LatLng | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const coords = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        setUserLoc(coords);
        setRegion({
          ...coords,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } else {
        setUserLoc(null);
        setRegion({
          latitude: 55.3959,
          longitude: 10.3883,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
      setLoading(false);
    })();
  }, []);

  if (loading || !region) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsUserLocation={!!userLoc}
      >
        <CarPin userLoc={userLoc} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MapScreen;
