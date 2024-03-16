<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$SodalityId=1;
//$decodedData['Sid'];
$id=0;
$name='';
$email='';
$docs='';
$name_u='';
$college='';
$year='';
$img='';
$SQLC = "select * from student where id_sodality= $SodalityId";
$tableC = mysqli_query($conn, $SQLC);
$checkName =  mysqli_num_rows($tableC);
if($checkName >0){
while($checkName > 0){
$row5=mysqli_fetch_assoc($tableC);
$studentId=$row5['id'];//take the id for student
$email=$row5['email'];
$docs=$row5['docs'];
$name=$row5['name'];
$name_u=$row5['name_u'];
$college=$row5['college'];
$year=$row5['year'];
$img=$row5['img'];

	$response[]=array($studentId,$name,$email,$docs,$name_u,$college,$year,$img);
	$checkName=$checkName-1;
}
}
else{
	$response=false;
}

echo json_encode($response);
?>