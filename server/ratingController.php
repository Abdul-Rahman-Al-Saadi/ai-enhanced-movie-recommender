<?php

include "connection.php";

if($connection->connect_error){
    die("Unsuccessful connection with the database");
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['user_id'], $data['movie_id'])) {
    $user_id = $data['user_id'];
    $movie_id = $data['movie_id'];
    $rating = $data['rating'];
}else{
    echo json_encode(["message"=>"Invalid parameters"]);
    exit();
}


$query = $connection->prepare("SELECT * FROM ratings WHERE user_id = ? AND movie_id = ?");
$query->bind_param('ii', $user_id, $movie_id);

$query->execute();
$result = $query->get_result();

if($result->num_rows > 0){
    $updateQuery = $connection->prepare("UPDATE ratings SET rating = ? WHERE user_id = ?");
    $updateQuery->bind_param('ii', $rating, $user_id);
    $updateQuery->execute();

    if($updateQuery){
        echo json_encode(["message"=> "Successfully Updated the rating"]);
    }else{
        echo json_encode(["message"=> "Unsuccessful operation to update the rating"]);
    }
}else{
    $insertQuery = $connection->prepare("INSERT INTO ratings (user_id, movie_id, rating) VALUES (?,?,?)");
    $insertQuery->bind_param('iii', $user_id, $movie_id, $rating);
    $insertQuery->execute();

    if($insertQuery){
        echo json_encode(["message"=> "Successfully Added the rating"]);
    }else{
        echo json_encode(["message"=> "Unsuccessful operation to add the rating"]);
    }
}
