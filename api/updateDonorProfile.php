<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$donors=$decodedData['user'];
//$donors='aa@gmail.com';
$donorName=$decodedData['name'];
$donorEmail=$decodedData['updateEmail'];
$img=$decodedData['Pic'];
$checkEmail=0;
//$donors='aya@gmail.com';
if($donors != $donorEmail){
$SQLU = "select * from donor where email = '$donorEmail' ";
$tableU = mysqli_query($conn, $SQLU);
$checkEmail =  mysqli_num_rows($tableU);
}
if ($checkEmail != 0) {
    $Message = "Already registered";
} 
else {
$SQL5 = "select * from donor where email = '$donors' ";
$table5 = mysqli_query($conn, $SQL5);
$row5=mysqli_fetch_assoc($table5);
$doner=$row5['d_id'];

$SQL1 = "update donor set name='$donorName' , email='$donorEmail' , img='$img' where d_id= $doner ";
$R = mysqli_query($conn, $SQL1);

    if ($R) {
        $Message = "Profile Update Successfully!";
    } else {
        $Message = "Error";
    }
}
	$response[] = array("Message" => $Message);

echo json_encode($response);
?>