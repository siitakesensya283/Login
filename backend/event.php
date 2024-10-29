<?php
// CORS設定
header("Access-Control-Allow-Origin: http://2024isc1231028.weblike.jp");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// データベース接続情報
$host = 'mysql309.phy.lolipop.lan';
$dbname = 'LAA1593707-testlogin';
$username = 'LAA1593707';
$password = 'password';
$port = '3306';

// データベース接続
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;port=$port;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'データベース接続に失敗しました。']));
}

// POSTデータの受け取り
$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];
$timeId = $data['timeId'];
$nextId = $data['nextId'];

// データベースからユーザ情報を取得
$stmt = $pdo->prepare('SELECT text,created_at FROM timeline WHERE userId = :userId AND id BETWEEN :timeId AND :nextId');
$stmt->bindParam(':userId', $userId);
$stmt->bindParam(':timeId', $timeId);
$stmt->bindParam(':nextId', $nextId);
$stmt->execute();
$eventline = $stmt->fetchAll(PDO::FETCH_COLUMN);

$response = [
    'event'=>$eventline['text'],
    'huwahuwaTime'=>$eventline['created_at']
];

// JSONレスポンスを返す
header('Content-Type: application/json');
echo json_encode($response);
?>