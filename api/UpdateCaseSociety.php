<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');//caseهون الطالب هو الي بضيف ال
$database = mysqli_select_db($conn, 'helping');
$encodedData = file_get_contents('php://input');  // take data from react native fetch API

$decodedData = json_decode($encodedData, true);
// $student='a@gmail.com';
//$decodedData['student'];
$money=$decodedData['money'];
$des=$decodedData['des'];
$img=$decodedData['Pic'];
// $idsodality=$decodedData['Sid'];
$caseId =$decodedData['Caseid'];

 

$SQL2 = "update societycases set money=$money,des='$des', img ='$img' where id = $caseId";

$R = mysqli_query($conn, $SQL2);
if($R)
{
$Message="Update Successfully";
}
else
{
$Message="Update not Successfully";
}

$Response=$Message;
echo json_encode($Response);
?>