<?php
header("Content-Type: application/json");
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = $data['userId'];
    $password = $data['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE userId = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode([
            'success' => true,
            'userId' => $user['id'],
            'name' => $user['name']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'ユーザIDまた�?�パスワードが間違って�?ます�?']);
    }
}
?>
