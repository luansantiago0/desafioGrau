<?php
require_once __DIR__ . '/../db.php';
// Ajustar o caminho se necessário
define('__ROOT__', dirname(dirname(__FILE__)));
require_once __ROOT__. '/models/ClienteModel.php';

header("Access-Control-Allow-Origin: *");
// Permitir os métodos necessários
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// Permitir os cabeçalhos necessários
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Enviar uma resposta OK para as preflight requests
    http_response_code(200);
    exit();
}

class ClienteController {
    public function cadastrar($dados) {
        return ClienteModel::cadastrarCliente($dados);
    }

    public function listarTodos() {
        return ClienteModel::listarClientes();
    }

    public function listar($id) {
        return ClienteModel::listarClientePorId($id);
    }

    public function atualizar($id, $dados) {
        return ClienteModel::atualizarCliente($id, $dados);
    }

    public function deletar($id) {
        return ClienteModel::deletarCliente($id);
    }
}
?>
