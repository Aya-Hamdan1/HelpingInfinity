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
import Section2 from '../components/Section2';
// const students = [
//     {
//         name : 'Ali',
//         mony:'30 000$',
//         label : require('../assets/banners/11.jpg'),
//         sub : '4k',
//         location: 'Nablus',
//         id: 1
//     },
//     {
//         name : 'Nour',
//         mony:'30 000$',
//         label : require('../assets/banners/22.jpg'),
//         sub : '4k',
//         location: 'Nablus',
//         id: 2
//     },
//     {
//         name : 'Ahmad',
//         mony:'30 000$',
//         label : require('../assets/banners/33.jpg'),
//         sub : '4k',
//         location: 'Tulkarm',
//         id: 3
//     },
//     {
//         name : 'Aya',
//         mony:'30 000$',
//         label : require('../assets/banners/44.jpg'),
//         sub : '4k',
//         location: 'Birzet-Ramallah',
//         id: 4
//     }
// ]
const Students = ({students, navigation}) => {
    return(
        <View>
        {/* <StatusBar backgroundColor='#9474cc' barStyle="light-content"/> */}
        {/* <View style={styles.headers}>
             <Text style={styles.text}>Your Society</Text>
        </View> */}
         <FlatList data={students} 
                renderItem={({item}) => {
                    return <Section2 name_u={item[6]} sodality={item[1]} student={item[2]} id={item[0]} mony={item[4]}  college={item[7]} year={item[8]} img={item[9]} status={item[11]} navigation={navigation} />;
                    
                }}
                showsVerticalScrollIndicator={false}
                // keyExtractor={(item) => item.id.toString()}
                 />
                </View>
                
    );
};
export default Students;

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