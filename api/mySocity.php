<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$donor=$decodedData['user'];
$email='';
$name='';
$address='';
$facebook='';
$phone='';
$subscrib='';
$img=0;
$id=0;
$SQL5 = "select * from donor where email = '$donor' ";
$table5 = mysqli_query($conn, $SQL5);
$row5=mysqli_fetch_assoc($table5);
$donorId=$row5['d_id'];//take the id for donors
$SQL6 = "select * from subscriptions where D_id= $donorId ";
$table6 = mysqli_query($conn, $SQL6);
$i = mysqli_num_rows($table6);
if($i > 0){
while($i > 0)
{
	$row6=mysqli_fetch_assoc($table6);
	$SodalityId=$row6['S_id'];//take the id for sodality
    $SQL = "select * from sodality where id=$SodalityId ";
    $table = mysqli_query($conn, $SQL);
	$i0 = mysqli_num_rows($table);
	
	
	$row=mysqli_fetch_assoc($table);
	$name=$row['name'];
	$email=$row['email'];
	$address=$row['address'];
	$facebook=$row['facebook'];
	$phone=$row['phone'];
	$subscribers=$row['subscribers'];
	$img=$row['img'];
	$id=$row['id'];
	$response[]=array($id,$name,$email,$address,$facebook,$phone,$subscribers,$img);
	$i=$i-1;
	
}
}
else{
	$response='No Results Found';
}
echo json_encode($response);
?>