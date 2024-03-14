
// import React from "react";
// import { View, Text, TouchableOpacity, Modal,} from "react-native";
// import { WebView } from 'react-native-webview';

// export default class Payment extends React.Component {
//     state = {
//         showModal: false,
//         status: "Pending"
//     };
//     handleResponse = data => {
//         if (data.title === "success") {
//             this.setState({ showModal: false, status: "Complete" });
//         } else if (data.title === "cancel") {
//             this.setState({ showModal: false, status: "Cancelled" });
//         } else {
//             return;
//         }
//     };
//     render() {
//         return (
//             <View style={{ marginTop: 100 }}>
//                 <Modal
//                     visible={this.state.showModal}
//                     onRequestClose={() => this.setState({ showModal: false })}
//                 >
//                     <WebView
//                         source={{ uri: "http://192.168.4.97:3000" }}
//                         onNavigationStateChange={data =>
//                             this.handleResponse(data)
//                         }
//                         injectedJavaScript={`document.f1.submit()`}
//                     />
//                 </Modal>
//                 <TouchableOpacity
//                     style={{ width: 300, height: 100 }}
//                     onPress={() => this.setState({ showModal: true })}
//                 >
//                     <Text>Pay with Paypal</Text>
//                 </TouchableOpacity>
//                 <Text>Payment Status: {this.state.status}</Text>
//             </View>
//         );
//     }
// }

import React, { useState } from 'react';
import { ActivityIndicator, View, Dimensions, Modal,Image,Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
// import { Modal } from 'react-native-paper';

const {width,height} = Dimensions.get('screen');

export default function Payment(props) {

  const route = useRoute();
  const sodality = route.params.sodality;
  const student = route.params.student;
  const mony = route.params.mony;
  const id = route.params.id;
  const [info, setInfo] = useState([]);
  const [showModal,setModal] = useState(false);
  const [stateP,setStateP] = useState('');
  const [cash1, setCash] = useState(false);
const ip = global.ip;
  // const amount = route.params.mony;
  const stateChng = (navState) => {
  //  console.log(navState);
//   const amount = route.params.mony;
   const { url, title } = navState ;
   if(title == "success"){
    alert("Donation Successfully");
      console.log("url",url);
      let spliturl = url.split('?');
      // console.log("spliturl",spliturl);
      let splitotherhalf = spliturl[1].split('&');
      console.log("splitotherhalf",splitotherhalf);
      let paymentId = splitotherhalf[0].replace("paymentId=","");
      let token = splitotherhalf[1].replace("token=","");
      let PayerID = splitotherhalf[2].replace("PayerID=","");
      props.navigation.navigate('Success',{payId:paymentId,token:token,payerId:PayerID})
      // console.log("paymentId", paymentId);
      // console.log("token", token);
      // console.log("PayerID", PayerID);
   }
  }
  const styles = StyleSheet.create({
    signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  });
  const GetInfo = () => {
    var APIURL = "http://"+ip+":80/api/getSocietyLocatio.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      Sid:sodality
    };
      fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
     if(Response=="No Results Found"){console.log("No Result!")}
    else {
     setInfo(Response);
     setCash(true);
    }
     })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
  const InsertPayment = () => {
    // alert(sodality+";;"+id+";;"+mony+";;"+student);
var InsertAPIURL="http://192.168.239.97:80/api/Payment.php";

var headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
  };

var Data = {
  sodality:sodality,
  student:student,
  donor:global.id,
  case:id,
  amount:mony
};

fetch(InsertAPIURL,
{
method:'POST',
headers:headers,
body:JSON.stringify(Data)
}
)
.then((response)=>response.json())
.then((response)=>
{
// console.log((response));
alert(response);
// this.props.navigation.navigate("SignInScreen");
})
.catch((error)=>{
console.log(JSON.stringify(error));
alert("Error"+error);
})
// alert(sodality+";;"+id+";;"+mony+";;"+student);
}
  handleResponse = (data) =>
  {
    if(data.title == 'success'){
      // showModal(false);
      setModal(false);
      setStateP('Complete');
      InsertPayment();

    }else if(data.title == 'cancel'){
      setModal(false);
      setStateP('Canceled');
    }
  }
  
  return (
    <View style={{marginTop: 100}}>
     
    <Modal visible={showModal}
     onRequestClose={()=>setModal(false)}>
     <WebView 
     startInLoadingState={true}
     onNavigationStateChange={data => this.handleResponse(data)}
     renderLoading={() => <Loading />}
     source={{ uri: "http://192.168.2.97:3000"}} 
     injectedJavaScript={'document.f1.submit()'} />
     </Modal>
     <TouchableOpacity style={[styles.signIn, {
                        borderColor: '#00008b',
                        borderWidth: 2,
                        marginTop: 15,
                        marginLeft: 50,
                        width:300
                    }]}
     onPress={() => setModal(true)}>
      <Text style={ {
                         color: '#00008b',
                         fontWeight: 'bold',
                         fontSize:30,
                         fontStyle: 'italic'
                    }}>Pay with Paypal</Text>
     </TouchableOpacity>
     <TouchableOpacity style={[styles.signIn, {
                        borderColor: '#00008b',
                        borderWidth: 2,
                        marginTop: 15,
                        marginLeft: 50,
                        width:300
                    }]} onPress={()=>GetInfo()}>
      <Text  style={ {
                         color: '#00008b',
                         fontWeight: 'bold',
                         fontSize:30,
                         fontStyle: 'italic'
                    }}>Cash</Text>
                    
     </TouchableOpacity>
     {cash1== false?<Image source={require('../assets/banners/pay.png')}/>: 
      <View style={{margin:10, borderWidth:1}}>
        <Text style={{fontSize:20, color:'#000', margin:10}}>
        Please visit {info[0]} Association located at {info[2]}, 
        to contact us at the following phone number {info[3]},
         or you can communicate through the following e-mail {info[1]} </Text></View>}
     
     </View>
  );
}

const Loading = () => {
  return(
    <View style={{height:height,width:width,justifyContent:'center',alignItems:'center'}}>
        <Image 
        source={require('../assets/banners/paypal.png')}
        style={{width:250,height:100,resizeMode:'contain'}}
        />
        {/* <Text>hello baraa</Text> */}
    </View>
  )
}