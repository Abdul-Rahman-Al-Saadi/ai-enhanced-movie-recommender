<?php
header("Content-Type: application/json");

// Database connection
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'movies_db';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data from the POST request
    $username = $_POST['username'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;

    // Basic validation
    if (!$username || !$email || !$password) {
        echo json_encode(["success" => false, "message" => "All fields are required."]);
        exit;
    }

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and execute the SQL statement to insert data
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Registration successful!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error registering user."]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>