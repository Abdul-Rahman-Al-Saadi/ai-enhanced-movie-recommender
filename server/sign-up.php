<?php
include("connection.php");

if($connection->connect_error){
    die("Connectioon failed: ". $connection->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $email_check_sql = "SELECT id FROM users WHERE email = ?";
    $email_check_query = $connection->prepare($email_check_sql);
    $email_check_query->bind_param("s",$email);
    $email_check_query->execute();
    $email_check_result = $email_check_query->get_result();

    if($email_check_result->num_rows > 0){
        echo"Erro: Email is already registered. Please choose another email";
    } else {

        $query = $connection->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $query->bind_param("sss", $name, $email, $password);

        if ($query->execute()) {
            echo json_encode(['success' => true, 'message' => 'User registered successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error registering user']);
        }
        $query->close();
    }
    $email_check_query->close();
}
$connection->close();
?>