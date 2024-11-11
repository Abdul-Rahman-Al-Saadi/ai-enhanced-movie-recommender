<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$host = "localhost";
$dbuser = "root";
$password = "";
$dbname = "movies_db";

$connection = new mysqli($host, $dbuser, $password, $dbname);