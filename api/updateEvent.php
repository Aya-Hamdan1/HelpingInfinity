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
$id=$decodedData['id'];
$num=0;
$SQL2 = "update events set name='$name', address ='$address', date='$date', time ='$time',s_id= $S_id,image='$img',num=$num where id=$id";

$R = mysqli_query($conn, $SQL2);
if($R)
{
$Message="Updated succefully";
}
else
{
$Message="Update not succefully";
}
$Response=$Message;
echo json_encode($Response);
?>
