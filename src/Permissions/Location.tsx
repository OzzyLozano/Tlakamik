import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

const Location = () => {
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
