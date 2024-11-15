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
    die(json_encode(['success' => false, 'message' => 'データベース接続失敗']));
}

$stmt = $pdo->prepare("SELECT longitude,latitude FROM GPS");
if ($stmt->execute()) {
    $gps = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response=[
        'success'=>true,
        'message'=>'gps取得成功',
        'gps'=>$gps,
    ];
} else {
    $response = [
        'success' => false,
        'message'=>'gps取得失敗',
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>