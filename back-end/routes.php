<?php
require_once 'controllers/UsuarioController.php';

// Configuração do CORS (se necessário)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With');

// Definição das rotas
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/usuarios') {
    // Listar todos os usuários
    $usuarioController = new UsuarioController();
    $usuarios = $usuarioController->listarTodos();
    echo json_encode($usuarios);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/usuarios') {
    // Cadastrar novo usuário
    $input = json_decode(file_get_contents('php://input'), true);
    $usuarioController = new UsuarioController();
    $resultado = $usuarioController->cadastrar($input);
    if ($resultado) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && preg_match('/\/usuarios\/(\d+)/', $_SERVER['REQUEST_URI'], $matches)) {
    // Exibir detalhes de um usuário específico
    $id = $matches[1];
    $usuarioController = new UsuarioController();
    $usuario = $usuarioController->listar($id);
    if ($usuario) {
        echo json_encode($usuario);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Usuário não encontrado']);
    }
} else {
    // Rota não encontrada
    http_response_code(404);
    echo json_encode(['error' => 'Rota não encontrada']);
}
?>
