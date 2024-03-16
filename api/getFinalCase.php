<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$SodalityId=$decodedData['Sid'];
$email='';
$name='';
$address='';
$facebook='';
$phone='';
$subscrib='';
$img=0;
$id=0;
$SQLC = "select * from societycases where id_sodality= $SodalityId";
$tableC = mysqli_query($conn, $SQLC);
$checkName =  mysqli_num_rows($tableC);
if($checkName >0)
{
while($checkName > 0){
$row5=mysqli_fetch_assoc($tableC);
$CaseId=$row5['id'];//take the id for case
$studentId=$row5['id_student'];//take the id for student
$money=$row5['money'];
$des=$row5['des'];
$img=$row5['img'];
$status=$row5['status'];
$SQL6 = "select * from student where id= $studentId ";
$table6 = mysqli_query($conn, $SQL6);
	$row6=mysqli_fetch_assoc($table6);
	$studenEmail= $row6['email'];
	$name = $row6['name'];
	$name_u=$row6['name_u'];
	$college=$row6['college'];
	$year=$row6['year'];
	$response[]=array($CaseId,$SodalityId,$studentId,$studenEmail,$money,$des,$name_u,$college,$year,$img,$name,$status);
	$checkName=$checkName-1;
}
}
else{
	$response = false;
}

echo json_encode($response);
?>