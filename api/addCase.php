<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');//caseهون الطالب هو الي بضيف ال
$database = mysqli_select_db($conn, 'helping');
$encodedData = file_get_contents('php://input');  // take data from react native fetch API

$decodedData = json_decode($encodedData, true);
$idstudent=$decodedData['Sid'];
$money=$decodedData['money'];
$des=$decodedData['des'];
$img=$decodedData['Pic'];
$idsodality=$decodedData['sodality'];
$status=0;

$sql= " select * from cases where id_student = $idstudent and id_sodality= $idsodality ";
$exeSQL = mysqli_query($conn, $sql);
$checkcase =  mysqli_num_rows($exeSQL);

if ($checkcase != 0) {
    $Message = "Already exist";
}

else{
$SQL2 = "insert into cases (id_student, money, des, id_sodality, img, status) values ( $idstudent, $money,'$des', $idsodality , '$img' , $status)";
$R = mysqli_query($conn, $SQL2);
if($R)
{
$Message="registered succefully";
}
else
{
$Message="registered not succefully";
}
}
$Response=$Message;
echo json_encode($Response);
?>
