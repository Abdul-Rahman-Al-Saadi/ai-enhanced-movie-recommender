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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data from the POST request
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;

    // Basic validation
    if (!$email || !$password) {
        echo json_encode(["success" => false, "message" => "Email and password are required."]);
        exit;
    }

    // Prepare and execute the SQL statement to fetch user by email
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        // Email not found
        echo json_encode(["success" => false, "message" => "Email not registered."]);
    } else {
        // Email found, now verify the password
        $user = $result->fetch_assoc();
        
        if (password_verify($password, $user['password'])) {
            // Password is correct
            echo json_encode(["success" => true, "message" => "Login successful!"]);
        } else {
            // Password is incorrect
            echo json_encode(["success" => false, "message" => "Incorrect password."]);
        }
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
