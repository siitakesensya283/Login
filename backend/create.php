<?php
header("Access-Control-Allow-Origin: http://2024isc1231028.weblike.jp");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$createNum = $data['createNum'];

$host = 'mysql309.phy.lolipop.lan';
$dbname = 'LAA1593625-test';
$username = 'LAA1593625';
$password = 'testTEST';
$port = '3306';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;port=$port;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'データベース接続失敗']));
}
function generateId($length = 8)
{
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}

while (true) {
    while (true) {
        $newId = generateId();
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE userId = :newId");
        $stmt->bindParam(':newId', $newId);
        $stmt->execute();
        $checkDuplicate = $stmt->fetchColumn();
        if ($checkDuplicate == 0)
            break;
    }

    $hashPass = password_hash($newId, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (userId, password) VALUES (:newId, :hashPass)");
    $stmt->bindParam(':newId', $newId);
    $stmt->bindParam(':hashPass', $hashPass);
    $stmt->execute();
    $createNum--;
    if ($createNum <= 0)
        break;
}
if ($createNum==0) {
    $response = [
        'success' => true,
        'message' => 'アカウント作成完了',
        'createdNum'=>$createNum
    ];
} else {
    $response = [
        'success' => false,
        'message' => 'アカウント作成失敗',
        'createdNum'=>$createNum
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>