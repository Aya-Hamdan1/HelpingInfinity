<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');//
$database = mysqli_select_db($conn, 'helping');
$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$student = $decodedData['student'];
$idsodality = $decodedData['sodality'];
$donor = $decodedData['donor'];
$case = $decodedData['case'];
$amount = $decodedData['amount'];

$sql= " select * from payment where c_id=$case";
$exeSQL = mysqli_query($conn, $sql);
$check =  mysqli_num_rows($exeSQL);

if ($check != 0) {
    $Message="The Case is done";
}
else{
$SQL2 = " insert into payment(d_id, s_id, c_id, amount, student_id) values ($donor , $idsodality , $case , $amount , $student)";
$R = mysqli_query($conn, $SQL2);

if($R)
{
    $sql3 = "update societycases set status=1 where id=$case";
    $stu = mysqli_query($conn, $sql3);
$Message="Donation completed successfully";
}
else
{
$Message="Donation not succefully";
}
}
$Response=$Message;
echo json_encode($Response);
?>