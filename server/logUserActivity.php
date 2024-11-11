<?php

include "connection.php";

if($connection->connect_error){
    die("Unsuccessful connection with the Database");
}

if(isset($_POST['user_id'], $_POST['movie_id'], $_POST['action'], $_POST['time_spent'])){
    $user_id = $_POST['user_id'];
    $movie_id = $_POST['movie_id'];
    $action = $_POST['action'];
    $time_spent = $_POST['time_spent'];
}else{
    die("Unvalid Body Parameters");
}

$query = $connection->prepare("INSERT INTO user_activities (user_id, movie_id, action, time_spent) VALUES (?, ?, ?, ?)");
$query->bind_param('iisi', $user_id, $movie_id, $action, $time_spent);
$result = $query->execute();

if($result){
    echo json_encode(["message"=> "User activity inserted successfully"]);
}else{
    json_encode(["message"=> "Unsuccessful operation to insert user activity"]);
}