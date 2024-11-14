<?php
header("Content-Type: application/json");

include "connection.php";

if ($connection->connect_error) {
    echo json_encode(["message" => "Database connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['user_id']) && isset($data['type'])) {
    $user_id = $data['user_id'];
    $type = $data['type'];

    $stmt = $connection->prepare("UPDATE users SET type = ? WHERE user_id = ?");
    if ($stmt) {
        $stmt->bind_param("si", $type, $user_id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "User type updated successfully"]);
        } else {
            echo json_encode(["message" => "Failed to update user type"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["message" => "Failed to prepare SQL statement"]);
    }
} else {
    echo json_encode(["message" => "Invalid input"]);
}

$connection->close();
?>