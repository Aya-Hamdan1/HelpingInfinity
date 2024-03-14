import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
     FlatList,
    StatusBar,
    Image
} from 'react-native';
import Section from '../components/Section';
import { useRoute } from '@react-navigation/native';
// const society = [
//     {
//         name : 'Najah',
//         label : require('../assets/banners/najah.jpg'),
//         sub : '4k',
//         location: 'Nablus',
//         id: 1
//     },
//     {
//         name : 'Al-Quds',
//         label : require('../assets/banners/ab.png'),
//         sub : '4k',
//         location: 'Nablus',
//         id: 2
//     },
//     {
//         name : 'Khaduri',
//         label : require('../assets/banners/k.jpeg'),
//         sub : '4k',
//         location: 'Tulkarm',
//         id: 3
//     },
//     {
//         name : 'Birzet',
//         label : require('../assets/banners/ber.jpg'),
//         sub : '4k',
//         location: 'Birzet-Ramallah',
//         id: 4
//     }
// ]
const Society = () => {
    const data = useRoute();
    society = data.params.society;
    const ip = global.ip;
    return(
        <View>
        {/* <StatusBar backgroundColor='#9474cc' barStyle="light-content"/> */}
        {/* <View style={styles.headers}>
             <Text style={styles.text}>Your Society</Text>
        </View> */}
         <FlatList data={society} 
                renderItem={({item}) => {
                    return <Section name={item[1]} label={require('../assets/banners/najah.jpg')} sub={item[6]} location={item[3]}/>;
                }}
                showsVerticalScrollIndicator={false}
                // keyExtractor={(item) => item.id.toString()} 
                />
                </View>
                
    );
};
export default Society;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#c94f7c'
      },
      header: {
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center'
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft:50,
        },
      headers:{
        height: 70,
        width: Math.round(Dimensions.get('window').width),
        marginBottom: 10,
        backgroundColor: '#9474cc',
     },

}
);