<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$subscrib='';
$sodality=$decodedData['s_name'];
$donors=$decodedData['user'];



$SQL0 = "select * from sodality where name = '$sodality' ";
$table = mysqli_query($conn, $SQL0);
$row=mysqli_fetch_assoc($table);
$subscribers=$row['subscribers'];
$sodalityId=$row['id'];
//echo $sodalityId;
$subscribers=$subscribers-1;

$SQL2 = "delete from subscriptions where D_id=$donors and S_id=$sodalityId";
$R2 = mysqli_query($conn, $SQL2);
$SQL1 = "update sodality set subscribers=$subscribers where name='$sodality'";
$R = mysqli_query($conn, $SQL1);

    if ($R) {
        $Message = "Subscription  canceled successfully!";
    } else {
        $Message = "Can't Canceled";
    }
	$response[] = array("Message" => $Message);
echo json_encode($response);
?>