<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');//caseهون الطالب هو الي بضيف ال
$database = mysqli_select_db($conn, 'helping');
$encodedData = file_get_contents('php://input');  // take data from react native fetch API

$decodedData = json_decode($encodedData, true);
$student=$decodedData['student'];
$money=$decodedData['money'];
$des=$decodedData['des'];
$img=$decodedData['Pic'];
$idsodality=$decodedData['Sid'];
$caseId = $decodedData['Caseid'];
$sql= " select * from student where email='$student'";
$exeSQL = mysqli_query($conn, $sql);
$status = 0;
$i=mysqli_num_rows($exeSQL);

if($i>0){
    $g =  mysqli_fetch_assoc($exeSQL);
    if($caseId != null){
        $select= " delete from cases where id_case = $caseId";
        $exedelete = mysqli_query($conn, $select);
        }
$idStudent = $g['id'];

$SQL2 = "insert into societycases(id_student, money, des, id_sodality, img , status) values ($idStudent,$money,'$des',$idsodality,'$img',$status)";
$R = mysqli_query($conn, $SQL2);
if($R)
{
$Message="registered successfully";
}
else
{
$Message="registered not successfully";
}
}
else{
    $Message="Please entered a valid Email";  
}
$Response=$Message;
echo json_encode($Response);
?>