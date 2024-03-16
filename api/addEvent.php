<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$name=$decodedData['name'];
$address=$decodedData['address'];
$date=$decodedData['date'];
$time=$decodedData['time'];
$S_id=$decodedData['Sid'];
$img=$decodedData['Pic'];
$num=0;
$SQL2 = "insert into events(name, address, date, time, s_id, image, num) values ('$name','$address','$date','$time',$S_id,'$img',$num)";
$R = mysqli_query($conn, $SQL2);
if($R)
{
$Message="Event Add succefully";
}
else
{
$Message="registered not succefully";
}
$Response=$Message;
echo json_encode($Response);
?>
