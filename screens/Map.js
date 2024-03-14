import MapView from "react-native-maps";
import { 
    View, 
    Text, 
    StyleSheet,
} from 'react-native';
import React, { useEffect } from 'react';
import { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map( ) {
    
    return(
      <View style={styles.body}>
        <Text stylele={styles.text}>
          Wellcom to map 
          
        </Text>
        <MapView
        provider={PROVIDER_GOOGLE}
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
      </View>
       

    );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,

  },
  map: {
    ...StyleSheet.absoluteFillObject,

  },
    
   });
