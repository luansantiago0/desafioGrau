<?php
require_once __DIR__ . '/../db.php';
define('__ROOT__', dirname(dirname(__FILE__)));
require_once __ROOT__. '/models/UsuarioModel.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// session_start();

class LoginController {
    public function login($email, $senha) {
        try {
            $usuario = UsuarioModel::listarUsuarioPorEmail($email);
            if (!$usuario || !password_verify($senha, $usuario['senha'])) {
                throw new Exception('Credenciais inválidas');
            }
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['perfil'] = $usuario['perfil'];
            return ['success' => true, 'message' => 'Login realizado com sucesso'];
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function logout() {
        session_destroy();
        return ['success' => true, 'message' => 'Logout realizado com sucesso'];
    }
}

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $input['email'] ?? '';
    $senha = $input['senha'] ?? '';

    $controller = new LoginController();
    $response = $controller->login($email, $senha);

    header('Content-Type: application/json');
    echo json_encode($response);
    
    // Ensure no extra content is added after the JSON response
    exit();
}
?>
