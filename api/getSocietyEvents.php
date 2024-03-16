<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$SodalityId=1;
//$decodedData['Sid'];
$email='';
$name='';
$address='';
$facebook='';
$phone='';
$subscrib='';
$img=0;
$id=0;
$SQLC = "select * from events where s_id= $SodalityId";
$tableC = mysqli_query($conn, $SQLC);
$checkName =  mysqli_num_rows($tableC);
if($checkName >0){
while($checkName > 0){
$row5=mysqli_fetch_assoc($tableC);
$eventId=$row5['id'];//take the id for case
$name=$row5['name'];
$address=$row5['address'];
$date=$row5['date'];
$time=$row5['time'];
$image=$row5['image'];
$num=$row5['num'];

	$response[]=array($eventId,$name,$date,$address,$time,$num,$image,0,$SodalityId);
	$checkName=$checkName-1;
}
}

echo json_encode($response);
?>