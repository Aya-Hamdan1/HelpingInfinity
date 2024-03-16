<?php
$CN = mysqli_connect("localhost", "root", "");
$DB = mysqli_select_db($CN, "helping");

$EncodedData=file_get_contents('php://input');
$DecodedData=json_decode($EncodedData, true);

$name=$DecodedData['name'];
$password=$DecodedData['password'];
$email=$DecodedData['email'];
$Pic = $DecodedData['Pic'];
$SQL = "select * from donor where email = '$email' ";
$exeSQL = mysqli_query($CN, $SQL);
$checkEmail =  mysqli_num_rows($exeSQL);

if ($checkEmail != 0) {
    $Message = "Already registered";
} else {

$IQ="insert into donor(name, email, password, img) VALUES ('$name','$email','$password', '$Pic' )";

$R=mysqli_query($CN,$IQ);

if($R)
{
$Message="registered succefully";
}
else
{
$Message="registered not succefully";
}
}
$Response[]=array("Message"=>$Message);
echo json_encode($Response);
?>