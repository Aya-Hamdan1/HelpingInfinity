<?php
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);


$d_id=$decodedData['user'];; //take the user id
//$d_id=27;


$SQL = "select * from subevents where d_id= $d_id ";
$table=mysqli_query($conn,$SQL);
$i=mysqli_num_rows($table);
if($i>0){
while($i>0)
{
  $Row=mysqli_fetch_assoc($table);
  $RollNo=$Row['e_id'];
    $SQ2="select * from events where id= $RollNo ";
	$table2=mysqli_query($conn,$SQ2);
    $Row2=mysqli_fetch_assoc($table2);
	$name=$Row2['name'];
	$date=$Row2['date'];
	$address=$Row2['address'];
	$time=$Row2['time'];
	$num=$Row2['num'];
	$img=$Row2['image'];
	$Sid=$Row2['s_id'];
	$sqlS="select * from sodality where id=$Sid";
	$tableS=mysqli_query($conn,$sqlS);
    $RowS=mysqli_fetch_assoc($tableS);
	$nameS=$RowS['name'];
	$response[]=array($RollNo,$name,$date,$address,$time,$num,$nameS,$img);
   $i=$i-1;
  
}
echo json_encode($response);
}
else{
	$response = "No Events!";
	echo json_encode($response);
}
?>