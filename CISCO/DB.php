<?php
//error_reporting(0);
$lh = true;
$serwer = ($lh)?'localhost':'mysql.hostinger.pl';
$uzytkownik = ($lh)?'root':'u402006295_r300';
$baza = ($lh)?'cisco':'u402006295_rd';
$haslo = ($lh)?'':'z9A23y8k6CIP';

$conn = new mysqli($serwer, $uzytkownik, $haslo, $baza);
$conn->set_charset("utf8");

if($conn->connect_error)
{
    die("<div class='alert alert-danger' style='margin: 0'><strong>Brak połączenia z DBMS!</strong><br> $conn->connect_error</div>");
}

$conn->select_db($baza);
$qchar = $_GET['char'];
$sql = ($lh)? "SELECT * FROM cisco_dictionary WHERE `FirstChar` = '$qchar'" : "SELECT * FROM cisco_dictionary WHERE `FirstChar` = '$qchar'";
$result = $conn->query($sql);
if($result == false)
    die("Error $conn->error");

$resultArray = array();
while($row = $result->fetch_row()) {
    $resultArray[] = $row;
}

echo json_encode($resultArray);
$conn -> close();
?>