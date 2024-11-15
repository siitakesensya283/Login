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

$data = json_decode(file_get_contents('php://input'), true);
$selectedTime = $data['selectedTime'];

$stmt = $pdo->prepare("WITH endTime AS ( SELECT * FROM CAN WHERE time > :selectedTime AND ign = 'IGN-OFF' ORDER BY time LIMIT 1) SELECT * FROM CAN WHERE time >= :selectedTime AND time <= (SELECT time FROM endTime) ORDER BY time");
$stmt->bindParam('selectedTime',$selectedTime);
if ($stmt->execute()) {
    $can = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $canTimeline = array_column($can, 'time');
    $canSpeed = array_column($can, 'VehicleSpeed');

    $response = [
        'success' => true,
        'canTimeline' => $canTimeline,
        'canSpeed' => $canSpeed
    ];
} else {
    $response = [
        'success' => false
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>