<?php
// include('db.php');
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'helping');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
$userId=$decodedData['user'];
//$userId=2;
$Name=$decodedData['name'];
// $Email=$decodedData['updateEmail'];
$img=$decodedData['Pic'];
$collage=$decodedData['collage'];
$university=$decodedData['university'];
$year=$decodedData['year'];
/*$Name='aya';
$Email='a';
$img='https://i.stack.imgur.com/l60Hf.png';
$collage='eng';
$university='najah';
$year=1;*/

$SQL1 = "update student set name='$Name' , name_u='$university', college='$collage', year= $year, img='$img' where id=$userId";
$R = mysqli_query($conn, $SQL1);

    if ($R) {
        $Message = "Profile Update Successfully!";
    } else {
        $Message = "Can't Updated";
    }
	$response = $Message;
echo json_encode($response);
?>