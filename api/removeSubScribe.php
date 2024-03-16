<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$subscrib='';
$sodality=$decodedData['Sid'];

$doner=$decodedData['donor'];



$SQL0 = "select * from sodality where id = '$sodality' ";
$table = mysqli_query($conn, $SQL0);
$row=mysqli_fetch_assoc($table);
$subscribers=$row['subscribers'];
$subscribers=$subscribers-1;

$SQL2 = "delete from subscriptions where D_id=$doner and S_id=$sodality";
$R2 = mysqli_query($conn, $SQL2);
$SQL1 = "update sodality set subscribers=$subscribers where id='$sodality'";
$R = mysqli_query($conn, $SQL1);

    if ($R) {
        $Message = "Deleted Successfully!";
    } else {
        $Message = "Error";
    }
	$response[] = array("Message" => $Message);
echo json_encode($response);
?>