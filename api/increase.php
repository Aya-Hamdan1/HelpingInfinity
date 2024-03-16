<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$subscrib='';
$sodality=$decodedData['s_name'];
$donors=$decodedData['user'];
$SQL5 = "select * from donor where email = '$donors' ";
$table5 = mysqli_query($conn, $SQL5);
$row5=mysqli_fetch_assoc($table5);
$doner=$row5['d_id'];
//echo $doner;



$SQL0 = "select * from sodality where name = '$sodality' ";
$table = mysqli_query($conn, $SQL0);
$row=mysqli_fetch_assoc($table);
$subscribers=$row['subscribers'];
$sodalityId=$row['id'];
//echo $sodalityId;
$subscribers=$subscribers+1;

$SQL2 = "insert into subscriptions(D_id, S_id) values ($doner,$sodalityId)";
$R2 = mysqli_query($conn, $SQL2);
$SQL1 = "update sodality set subscribers=$subscribers where name='$sodality'";
$R = mysqli_query($conn, $SQL1);

    if ($R) {
        $Message = "Subscribers Successfully!";
    } else {
        $Message = "Error";
    }
	$response[] = array("Message" => $Message);
echo json_encode($response);
?>