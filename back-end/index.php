<?php
session_start();


// Configuração do CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With');

// Definir o tipo de conteúdo como JSON
header('Content-Type: application/json');

// Verificar o método da requisição
$method = $_SERVER['REQUEST_METHOD'];

$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));


// Obter a entidade (usuario, cliente, categoria) da URL
$entity = array_shift($request);

// Roteamento básico
switch ($entity) {
    case 'usuario':
        require './controllers/UsuarioController.php';
        $controller = new UsuarioController();
        handleRequest($controller, $method, $request);
        
        break;
    case 'cliente':
        require './controllers/ClienteController.php';
        $controller = new ClienteController();
        handleRequest($controller, $method, $request);
        break;
    case 'categoria':
        require './controllers/CategoriaController.php';
        $controller = new CategoriaController();
        handleRequest($controller, $method, $request);
        break;
    case 'login':
        require './controllers/LoginController.php';
        $controller = new LoginController();
        handleRequest($controller, $method, $request);
        break;
    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Endpoint não encontrado']);
        break;
}

function handleRequest($controller, $method, $request) {
    $id = isset($request[0]) ? $request[0] : null;
    switch ($method) {
        case 'GET':
            if ($id) {
                echo json_encode($controller->listar($id));
            } else {
                echo json_encode($controller->listarTodos());
            }
            break;
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            if (get_class($controller) == 'LoginController') {
                echo json_encode($controller->login($input['email'], $input['senha']));
                break;    
            }
            echo json_encode($controller->cadastrar($input));
            break;
        case 'PUT':
            if ($id) {
                $input = json_decode(file_get_contents('php://input'), true);
                echo json_encode($controller->atualizar($id, $input));
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'ID necessário para atualização']);
            }
            break;
        case 'DELETE':
            if ($id) {
                echo json_encode($controller->deletar($id));
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'ID necessário para exclusão']);
            }
            break;
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método não permitido']);
            break;
    }
    
}

?>
