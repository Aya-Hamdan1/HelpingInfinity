<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$sodality=$decodedData['sodality'];
//$sodality='bb@gmail.com';
$Name=$decodedData['name'];
$Email=$decodedData['updateEmail'];
$img=$decodedData['Pic'];
$phone=$decodedData['phone'];
$address=$decodedData['address'];
$facebook=$decodedData['facebook'];
$checkEmail=0;
/*if($sodality != $Email){
$SQLU = "select * from sodality where email = '$Email' ";
$tableU = mysqli_query($conn, $SQLU);
$checkEmail =  mysqli_num_rows($tableU);
}
if ($checkEmail != 0) {
    $Message = "Already registered";
} 
else {*/

$SQL1 = "update sodality set name='$Name' , email='$Email' , address='$address' ,facebook='$facebook' , phone='$phone' , img='$img' where id=$sodality";
$R = mysqli_query($conn, $SQL1);

    if ($R) {
        $Message = "Profile Update Successfully!";
    } else {
        $Message = "image is too large";
    }
/*}*/
	$response[] = array("Message" => $Message);

echo json_encode($response);
?>