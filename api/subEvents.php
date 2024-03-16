<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$num=0;
$events=$decodedData['event_id'];
$donors=$decodedData['user'];
$SQL5 = "select * from donor where email = '$donors' ";
$table5 = mysqli_query($conn, $SQL5);
$row5=mysqli_fetch_assoc($table5);
$doner=$row5['d_id'];



$SQL0 = "select * from events where id = $events ";
$table = mysqli_query($conn, $SQL0);
$row=mysqli_fetch_assoc($table);
$num=$row['num'];
$num=$num+1;

$SQL2 = "insert into subevents(d_id, e_id) values ($doner,$events)";
$R2 = mysqli_query($conn, $SQL2);
$SQL1 = "update events set num=$num where id=$events";
$R = mysqli_query($conn, $SQL1);

    if ($R) {
        $Message = "Attendance registered successfully!";
    } else {
        $Message = "Error";
    }
	$response[] = array("Message" => $Message);
echo json_encode($response);
?>