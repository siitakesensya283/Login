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
        // ログイン成功時にユーザー情報をレスポンスに含める
        echo json_encode([
            'success' => true,
            'userId' => $user['id'],  // 追加: userIdを含める
            'name' => $user['name']    // 追加: ユーザー名も含める（必要に応じて）
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'ユーザIDまたはパスワードが間違っています。']);
    }
}
?>
