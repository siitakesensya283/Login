<?php
header("Access-Control-Allow-Origin: http://2024isc1231028.weblike.jp");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'mysql309.phy.lolipop.lan';
$dbname = 'LAA1593707-testlogin';
$username = 'LAA1593707';
$password = 'password';
$port = '3306';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;port=$port;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'データベース接続に失敗しました。']));
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];
$password = $data['password'];

$stmt = $pdo->prepare('SELECT * FROM users WHERE userId = :userId');
$stmt->bindParam(':userId', $userId);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {

    $stmt = $pdo->prepare("SELECT time FROM CAN WHERE ign='IGN-ON'");

    if ($stmt->execute()) {
        $timeline = $stmt->fetchAll(PDO::FETCH_COLUMN);

        if (!empty($timeline)) {

            $stmt = $pdo->prepare("SELECT id FROM timeline WHERE text = '' AND userId = :userId AND flg = 1");
            $stmt->bindParam('userId', $userId);
            if ($stmt->execute()) {
                $timeId = $stmt->fetchAll(PDO::FETCH_COLUMN);
                if (!empty($timeId)) {
                    $response = [
                        'success' => true,
                        'message' => 'ログイン成功！',
                        'name' => $user['name'],
                        'timeline' => $timeline,
                        'timeId' => $timeId
                    ];
                } else {
                    $response = [
                        'success' => true,
                        'message' => 'ログイン成功！',
                        'name' => $user['name'],
                        'timeline' => $timeline,
                        'timeId' => []
                    ];
                }
            }
        } else {
            $response = [
                'success' => true,
                'message' => 'ログイン成功！',
                'name' => $user['name'],
                'timeline' => []
            ];
        }
    } else {
        $response = [
            'success' => false,
            'message' => 'タイムラインデータの取得に失敗しました。',
            'error' => $stmt->errorInfo()
        ];
    }

} else {
    $response = [
        'success' => false,
        'message' => 'ユーザIDまたはパスワードが間違っています。'
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>