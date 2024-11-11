<?php

include "connection.php";

if($connection->connect_error){
    die("Unsuccessful connection with the database");
}

if (isset($_POST['user_id'], $_POST['movie_id'], $_POST['rating'])){
    $user_id = $_POST['user_id'];
    $movie_id = $_POST['movie_id'];
    $rating = $_POST['rating'];
}else{
    die("Incorrect Rating Info");
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
