<?php

include "connection.php";

if ($connection->connect_error) {
    die("Error Connecting to Database");
}

if (isset($_POST['user_id'], $_POST['movie_id'])) {
    $user_id = $_POST['user_id'];
    $movie_id = $_POST['movie_id'];
} else {
    die("Couldn't get the user or the movie for the bookmark");
}

$query = $connection->prepare("SELECT * FROM bookmarks WHERE user_id = ? AND movie_id = ?");
$query->bind_param('ii', $user_id, $movie_id);
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
    $deleteQuery = $connection->prepare("DELETE FROM bookmarks WHERE user_id = ? AND movie_id = ?");
    $deleteQuery->bind_param('ii', $user_id, $movie_id);
    $deleteResult = $deleteQuery->execute();

    if ($deleteResult) {
        echo json_encode(["message" => "Bookmark successfully removed"]);
    } else {
        echo json_encode(["message" => "Unsuccessful operation to remove bookmark"]);
    }
} else {
    $insertQuery = $connection->prepare("INSERT INTO bookmarks (user_id, movie_id) VALUES (?, ?)");
    $insertQuery->bind_param('ii', $user_id, $movie_id);
    $insertResult = $insertQuery->execute();

    if ($insertResult) {
        echo json_encode(["message" => "Bookmark successfully added"]);
    } else {
        echo json_encode(["message" => "Unsuccessful operation to add bookmark"]);
    }
}

?>
