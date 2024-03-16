<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$donor = 27;
$email='';
$name='';
$address='';
$facebook='';
$phone='';
$subscrib='';
$img='';

$SQL = "select * from sodality where 1";
$table = mysqli_query($conn, $SQL);
$checkName =  mysqli_num_rows($table);
while($checkName > 0)
{
	$row=mysqli_fetch_assoc($table);
	$name=$row['name'];
	$email=$row['email'];
	$address=$row['address'];
	$facebook=$row['facebook'];
	$phone=$row['phone'];
	$subscribers=$row['subscribers'];
	$img=$row['img'];
	$id=$row['id'];
	$sqlD = "select * from subscriptions where D_id=$donor and S_id=$id";
	$sub = mysqli_query($conn,$sqlD);
	$checkSub =  mysqli_num_rows($sub);
	if($checkSub > 0){
		$isSub = 1;
	}
	else{
		$isSub = 0;
	}
	$checkName=$checkName-1;
	$response[]=array($id,$name,$email,$address,$facebook,$phone,$subscribers,$img, $isSub);
}

echo json_encode($response);
?>