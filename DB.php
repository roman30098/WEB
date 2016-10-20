<?php
error_reporting(0);
$serwer = 'localhost';
$uzytkownik = 'u402006295_r300';
$haslo = 'F5nLZ$RMjb';
 
$conn = new mysqli($serwer, $uzytkownik, $haslo, 'u402006295_rd.test');
$conn->set_charset("utf8");
 
if($conn->connect_error)
{
	die("<div class='alert alert-danger alertBlink' style='margin: 0'><strong>Brak połączenia z DBMS!</strong><br> $conn->connect_error</div>");
}
 
// operacje wykonywane na bazie
$sql = $_POST['query'];
//$sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'test' AND TABLE_NAME = 'BDZMProjects'";
$result = $conn->query($sql);
if($result == false)
	die("<div class='alert alert-danger alertBlink' style='margin: 0'><strong>Coś jest nie tak z Twoim zapytaniem: </strong><br> $conn->error</div>");

$isEncoded = $_POST['encode'];
$numberOfColumns = 0;
while($row = $result->fetch_row()) {
	$numberOfColumns = 0;
	$data .= "<tr>";
	foreach ($row as $key => $value) {
		if($isEncoded == "true"){
			$value = encode($value);
		}
		$data .= "<td>".$value."</td>";
		$numberOfColumns++;
	}
	$data .= "</tr>";
}

if($numberOfColumns > 0){
	$titles = $_POST['titles'];
	
	echo "<table class='table' style='margin: 0'><tr>";
	for($i = 0; $i < $numberOfColumns; $i++){
		echo "<th>$titles[$i]</th>";
	}
	echo "</tr>";
	echo $data;
	echo "</table>";
}
else
	echo "Eeee pusto....";

$conn->close();

function encode($value){
	$lenght = strlen($value);
	$encodedChars = array("#", "@", "!", "*", "&", "_", "%", "a", "e", "i", "h", "z", "r", "w", "ł", "k", "x");

	for($i = 0; $i < $lenght/2; $i++){
		$value[rand(0, $lenght-1)] = $encodedChars[rand(0, 15)];
	}

	return $value;
}
?>