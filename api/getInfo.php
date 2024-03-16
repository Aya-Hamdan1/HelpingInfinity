<?php
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);


$s_id=$decodedData['socity'];; //take this value
//$s_id=1;
$donor=$decodedData['donor'];
$S_name='';
$name='';
$address='';
$date='';
$time='';
$num=0;
$img='';
$id=0;
$s_id=1;
$SQL = "select * from events where s_id= $s_id ";
$table = mysqli_query($conn, $SQL);
$checkName =  mysqli_num_rows($table);
if($checkName > 0){
while($checkName > 0)
{   
	$row=mysqli_fetch_assoc($table);
	$name=$row['name'];
	$date=$row['date'];
	$address=$row['address'];
	$time=$row['time'];
	$num=$row['num'];
	$img=$row['image'];
	$id=$row['id'];
	$Sdon = "select * from subevents where d_id= $donor and e_id=$id ";
    $done = mysqli_query($conn, $Sdon);
	$isdone =  mysqli_num_rows($done);
    if($isdone > 0){
		$checkName=$checkName-1;
		$response[]=array($id,$name,$date,$address,$time,$num,$img,1);
     }
    else{
		$checkName=$checkName-1;
 	$response[]=array($id,$name,$date,$address,$time,$num,$img,0);
    }
}
echo json_encode($response);
}
else{
	$response[]=array(null);
	echo $response;
}
?>