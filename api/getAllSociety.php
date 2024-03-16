<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$email = '';
$id=0;

$SQL = "select * from sodality ";
$table = mysqli_query($conn, $SQL);

$i=mysqli_num_rows($table);
   while($i>0)
   {
	$row=mysqli_fetch_assoc($table);
	$name=$row['name'];
	$id=$row['id'];
	$i--;
	$response[]=array($name);
	
   }


echo json_encode($response);
?>