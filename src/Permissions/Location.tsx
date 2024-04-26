import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';

const Location = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);

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
          
          setPermissionGranted(true);
        } else {
          console.log('Permiso denegado');
          setPermissionGranted(false);
        }
      } catch (err) {
        console.warn(err);
        setPermissionGranted(false);
      }
    };

    requestLocationPermission();
  }, []);

  return permissionGranted;
};

export default Location;
