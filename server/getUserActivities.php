<?php

include "connection.php";

if($connection->connect_error){
    die("Unsuccessful connection with the Database");
}

if(isset($_GET['user_id'])){
    $user_id = $_GET['user_id'];
}else{
    die("Invalid Body Parameters");
}

$queryStatment = "SELECT m.title
FROM movies_db.movies m
JOIN movies_db.ratings r ON m.movie_id = r.movie_id
WHERE r.user_id = ? AND r.rating > 3
UNION
SELECT m.title
FROM movies_db.movies m
JOIN movies_db.bookmarks b ON m.movie_id = b.movie_id
WHERE b.user_id = ?
UNION
SELECT m.title
FROM movies_db.movies m
JOIN movies_db.user_activities a ON m.movie_id = a.movie_id
WHERE a.user_id = ? AND a.time_spent > 4;";

$query = $connection->prepare($queryStatment);
$query->bind_param('iii', $user_id, $user_id, $user_id);
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
