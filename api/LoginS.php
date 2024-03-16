<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);


$email = $decodedData['email'];
$password= $decodedData['password']; 

$SQL = "select * from student where email = '$email' and password = '$password'";
$exeSQL = mysqli_query($conn, $SQL);
$checkName =  mysqli_num_rows($exeSQL);

if ($checkName == 0) {
	$Message = false;
	}
else {
        $Message = true;
    }


$response = $Message;
echo json_encode($response);
?>