<?php
//to select  الي مشترك فيها النتبرع هاد الصح
$CN = mysqli_connect('localhost', 'root', '');
$DB = mysqli_select_db($CN, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);

$donor=$decodedData['user'];
//$donor='aya@gmail.com';
$SQL5 = "select * from donor where email = '$donor' ";
$table5 = mysqli_query($CN, $SQL5);
$row5=mysqli_fetch_assoc($table5);
$doner_id=$row5['d_id'];
$SQ="select * from subscriptions where D_id=$doner_id";// تبع الجمعية الي مشترك فيهاid هون اخترنا ال  

$table=mysqli_query($CN,$SQ);
$i=mysqli_num_rows($table);
if($i>0){
while($i>0)
{
  $Row=mysqli_fetch_assoc($table);
  $RollNo=$Row['S_id'];
    $SQ2="select * from sodality where id=$RollNo";
	$table2=mysqli_query($CN,$SQ2);
    $Row2=mysqli_fetch_assoc($table2);
	$name=$Row2['name'];
	$email=$Row2['email'];
	$address=$Row2['address'];
	$facebook=$Row2['facebook'];
	$phone=$Row2['phone'];
	$subscribers=$Row2['subscribers'];
	$img=$Row2['img'];
	$id=$Row2['id'];
	$response[]=array($id,$name,$email,$address,$facebook,$phone,$subscribers,$img);
   $i=$i-1;
  
}
//echo json_encode($response);
}
else{
	$response= false;
}
echo json_encode($response);
//$checkName=mysqli_num_rows($table);


 //  while($checkName > 0)
/*{
  $donor=$RollNo[0];
  $SQ2="select * from sodality where id=$donor";
  $table2=mysqli_query($CN,$SQ2);
  $Row2=mysqli_fetch_assoc($table2);
  $RollNo2=$Row2['name'];
  $checkName=$checkName-1;
  $response[]=array($RollNo2);
}*/




?>
