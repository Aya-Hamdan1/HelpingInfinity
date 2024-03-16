<?php
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);

$email = $decodedData['email'];
$password = $decodedData['password']; 
$name = $decodedData['name'];
$name_u = $decodedData['name_u'];
$college = $decodedData['college'];
$year = $decodedData['year'];
$docs = $decodedData['Pic'];
$Pic = $decodedData['profile'];
$society = $decodedData['society'];

$SQL0 = "select *from sodality where name = '$society' ";
$exeSQL0 = mysqli_query($conn, $SQL0);
$row=mysqli_fetch_assoc($exeSQL0);
$checkSodality =  mysqli_num_rows($exeSQL0);
if( $checkSodality>0){
$id=$row['id'];


$SQL = "select *from student where email = '$email' ";
$exeSQL = mysqli_query($conn, $SQL);
$checkEmail =  mysqli_num_rows($exeSQL);

if ($checkEmail != 0) {
    $Message = "Already registered";
} else {
    // $insertPic = "insert into pictures (image) values ( '$Pic' )";
    // $p1= mysqli_query($conn, $insertPic);
    

    $InsertQuerry =" insert into student(name, email, password, docs, name_u, college, year, img, id_sodality) 
	values ( '$name' , '$email','$password','$docs','$name_u','$college',$year, '$Pic', $id )";
    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = 2;
    } else {
        $Message = 0;
    }
}
}
else{
    $Message = 1;
}
//$response[] = array("Message" => $Message);
$response = $Message;

echo json_encode($response);