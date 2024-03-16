<?php
//الجمعيات الي مشترك فيها المتبرع
$mysqli = new mysqli("localhost","root","","helping");

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);

$donor=27;
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

$sql = "SELECT * FROM subscriptions where D_id=$donor";
$i=0;
$sodality[]=array('');
if ($result = $mysqli -> query($sql)) {
  while ($obj = $result -> fetch_object()) {
    $SQ2="select * from sodality where id=$obj->S_id";
	$result2 = $mysqli -> query($SQ2);
	$obj2 = $result2 -> fetch_object();
	$sodality[$i]=$obj2->name;
	printf("%s \n", $sodality[$i]);
	$i++;
  }
  $Response[]=array("Message"=>$Message);
echo json_encode($Response);
  $result -> free_result();
}
//
$mysqli -> close();
?>