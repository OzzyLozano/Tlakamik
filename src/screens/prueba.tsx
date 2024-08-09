import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const App = () => {
  const [data, setData] = useState<Response | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 25.85028,
    longitude: -97.50444,
    latitudeDelta: .06,
    longitudeDelta: .06,
  });

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
      >
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
