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

$SQL = "select * from student where email = '$email' ";
$exeSQL = mysqli_query($conn, $SQL);
$checkEmail =  mysqli_num_rows($exeSQL);

if ($checkEmail != 0) {
    $Message = "Already registered";
} else {

    $InsertQuerry =" insert into student(name, email, password, docs, name_u, college, year ) 
	VALUES ( '$name' , '$email','$password','$docs','$name_u','$college',$year)";
    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Complete--!";
    } else {
        $Message = "Error";
    }
}
$response[] = array("Message" => $Message);

echo json_encode($response);
?>