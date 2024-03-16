<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$email = $decodedData['Sid'];
$name='';
$address='';
$facebook='';
$phone='';
$subscrib='';
$img='';
$SQL = "select * from sodality where email='$email'";
$table = mysqli_query($conn, $SQL);
$checkName =  mysqli_num_rows($table);

	$row=mysqli_fetch_assoc($table);
	$name=$row['name'];
	$email=$row['email'];
	$address=$row['address'];
	$facebook=$row['facebook'];
	$phone=$row['phone'];
	$subscribers=$row['subscribers'];
	$img=$row['img'];
	$id=$row['id'];
	$checkName=$checkName-1;
	$response=[$id,$name,$email,$address,$facebook,$phone,$subscribers,$img];


echo json_encode($response);
?>