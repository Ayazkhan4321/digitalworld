<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "@Yaz6205";  // Your MySQL password
$dbname = "my_database"; // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $firstname = $_POST['firstname'];
    $email = $_POST['email'];
    $phone_number = $_POST['phone_number'];
    $message = $_POST['message'];

    // Prepare the SQL query to insert data into the user_info table
    $sql = "INSERT INTO user_info (firstname, email, phone_number, message)
            VALUES (?, ?, ?, ?)";

    // Use prepared statements to avoid SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $firstname, $email, $phone_number, $message);

    // Execute the query and check if successful
    if ($stmt->execute()) {
        echo "Your information has been submitted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
}

$conn->close();
