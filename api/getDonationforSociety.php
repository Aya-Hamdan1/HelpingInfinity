<?php
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);


$S_id=$decodedData['S_id'];; //take this value


$S_name='';
$amount=0;

$SQL = "select * from payment where s_id= $S_id ";
$table = mysqli_query($conn, $SQL);
$checkName =  mysqli_num_rows($table);
if($checkName > 0){
while($checkName > 0)
{   
	$row=mysqli_fetch_assoc($table);
	$stu_id=$row['student_id'];
	$d_id = $row['d_id'];
	$SqlS = "select * from donor where d_id= $d_id ";
    $tableS = mysqli_query($conn, $SqlS);
    $rowS=mysqli_fetch_assoc($tableS);
    $Sqlstu = "select * from student where id= $stu_id ";
    $tableStu = mysqli_query($conn, $Sqlstu);
    $rowStu=mysqli_fetch_assoc($tableStu);
	$stuName=$rowStu['name'];
	$stuEmail=$rowStu['email'];
    $d_email=$rowS['email'];
	$dname=$rowS['name'];
	$amount=$row['amount'];
    $case=$row['c_id'];
	$checkName=$checkName-1;
	$response[]=array($d_email,$stuEmail,$stuName,$dname,$amount,$case);
}
echo json_encode($response);
}
else{
	$response[]=array(false);
	echo $response;
}
?>