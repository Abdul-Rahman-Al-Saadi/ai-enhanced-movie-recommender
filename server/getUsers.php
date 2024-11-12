<?php

include "connection.php";

if($connection->connect_error){
    die("Unsuccessful connection with the Database");
}

$query = $connection->prepare("SELECT * FROM users");

if ($query === false) {
    die("Error preparing the SQL query: " . $connection->error);
}

$query->execute();
$result = $query->get_result();

if($result->num_rows > 0){
    $array = [];

    while($resultObject = $result->fetch_assoc()){
        $array [] = $resultObject;
    }
    echo json_encode($array);
}else{
    echo json_encode(["message"=> "No movies Found"]);
}