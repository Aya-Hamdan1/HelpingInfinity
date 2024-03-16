<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
//$donor=$decodedData['donor'];
$student=$decodedData['email'];
$SQL = "select * from student where email = '$student' ";
$table = mysqli_query($conn, $SQL);
$row=mysqli_fetch_assoc($table);
$id=$row['id'];//take the id for student
$name=$row['name'];
$email=$row['email'];
$img=$row['img'];
$uni=$row['name_u'];
$college=$row['college'];
$year=$row['year'];
$id_sodality=$row['id_sodality'];
$Response=[$id,$name,$email,$img,$uni,$college,$year,$id_sodality];
echo json_encode($Response);
?>