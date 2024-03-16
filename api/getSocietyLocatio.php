<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$id = $decodedData['Sid'];

$SQL = "select * from sodality where id=$id";
$table = mysqli_query($conn, $SQL);
$checkName =  mysqli_num_rows($table);

	$row=mysqli_fetch_assoc($table);
	$name=$row['name'];
	$email=$row['email'];
	$address=$row['address'];
	
	$phone=$row['phone'];
	
	$checkName=$checkName-1;
	$response=[$name,$email,$address,$phone];


echo json_encode($response);
?>