import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';  // Asegúrate de tener instalada esta biblioteca

const Location = () => {
  const [location, setLocation] = useState({
    latitude: 0.0,
    longitude: 0.0
  });
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de ubicación',
            message: 'Necesitamos tu permiso para acceder a tu ubicación',
            buttonPositive: 'Aceptar',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permiso concedido');
          // Ahora puedes utilizar Geolocation para obtener la ubicación
          // Geolocation.getCurrentPosition(
          //   (position) => setLocation(position.coords),
          //   (error) => console.log(error),
          //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          // );
        } else {
          console.log('Permiso denegado');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    true
  );
};

export default Location;
