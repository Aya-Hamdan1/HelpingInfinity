<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$Sid=$decodedData['Sid'];
$email='';
$name='';
$address='';
$img=0;
$SQL6 = "select * from subscriptions where S_id= $Sid ";
$table6 = mysqli_query($conn, $SQL6);
$i = mysqli_num_rows($table6);
if($i == 0){
    $response=false;
}
else{
while($i > 0)
{
	$row6=mysqli_fetch_assoc($table6);
	$DonorId=$row6['D_id'];//take the id for donor
    $SQL = "select * from donor where d_id=$DonorId ";
    $table = mysqli_query($conn, $SQL);
	$row=mysqli_fetch_assoc($table);
	$name=$row['name'];
	$email=$row['email'];
	$img=$row['img'];
	$id=$row['d_id'];
	$response[]=array($id,$name,$email,$img);
	$i=$i-1;
}
}
echo json_encode($response);
?>