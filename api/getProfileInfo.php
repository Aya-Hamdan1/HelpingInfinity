<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$donor=$decodedData['donor'];
//$donor='aya@gmail.com';
$SQL = "select * from donor where email = '$donor' ";
$table = mysqli_query($conn, $SQL);
$row=mysqli_fetch_assoc($table);
$id=$row['d_id'];//take the id for donors
$name=$row['name'];
$email=$row['email'];
$img=$row['img'];
$Response=[$id,$name,$email,$img];
echo json_encode($Response);
?>