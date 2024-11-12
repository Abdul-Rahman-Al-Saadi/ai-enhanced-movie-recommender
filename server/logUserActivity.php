<?php

include "connection.php";

if($connection->connect_error){
    die("Unsuccessful connection with the Database");
}

$data = json_decode(file_get_contents('php://input'), true);


if(isset($data['user_id'], $data['movie_id'], $data['time_spent'])){
    $user_id = $data['user_id'];
    $movie_id = $data['movie_id'];
    $time_spent = $data['time_spent'];
}else{
    die("Unvalid Body Parameters");
}

$query = $connection->prepare("INSERT INTO user_activities (user_id, movie_id, time_spent) VALUES (?, ?, ?)");
$query->bind_param('iii', $user_id, $movie_id, $time_spent);
$result = $query->execute();

if($result){
    echo json_encode(["message"=> "User activity inserted successfully"]);
}else{
    json_encode(["message"=> "Unsuccessful operation to insert user activity"]);
}
