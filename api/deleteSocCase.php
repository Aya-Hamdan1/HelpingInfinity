<?php
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$CaseId=$decodedData['Cid'];


$SQLC = "select * from societycases where id= $CaseId";
$tableC = mysqli_query($conn, $SQLC);
$checkName =  mysqli_num_rows($tableC);
if($checkName >0)
{

$SQL6 = "delete from societycases where id= $CaseId ";
$table6 = mysqli_query($conn, $SQL6);
  if($table6){
	$response = true;
  }
  else {
	$response = false;
  }
}

else{
	$response = false;
}
echo json_encode($response);
?>