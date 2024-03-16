<?php
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);


$d_id = $decodedData['user'];; //take this value


$S_name='';
$amount=0;

$SQL = "select * from payment where d_id= $d_id ";
$table = mysqli_query($conn, $SQL);
$checkName =  mysqli_num_rows($table);
if($checkName){
while($checkName > 0)
{
	$row=mysqli_fetch_assoc($table);
	$s_id = $row['s_id'];
	$SqlS = "select * from sodality where id= $s_id ";
    $tableS = mysqli_query($conn, $SqlS);
    $rowS=mysqli_fetch_assoc($tableS);
   
    $S_name=$rowS['name'];
	$s_id=$row['s_id'];
	$stu_id=$row['student_id'];
	$amount=$row['amount'];
    $case=$row['c_id'];
	$checkName=$checkName-1;
	$response[]=array($s_id,$stu_id,$amount,$case,$S_name);
}
echo json_encode($response);
}
else{
	$response =false;
	echo json_encode($response);
}
?>