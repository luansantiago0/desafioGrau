<?php
require_once '../db.php'; // Ajustar o caminho se necessário
define('__ROOT__', dirname(dirname(__FILE__)));
require_once __ROOT__. '/models/CategoriaModel.php';

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

class CategoriaController {
    public function cadastrar($dados) {
        return CategoriaModel::cadastrarCategoria($dados['nome']);
    }

    public function listarTodos() {
        return CategoriaModel::listarCategorias();
    }

    public function listar($id) {
        return CategoriaModel::listarCategoriaPorId($id);
    }

    public function atualizar($id, $dados) {
        return CategoriaModel::atualizarCategoria($id, $dados['nome']);
    }

    public function deletar($id) {
        return CategoriaModel::deletarCategoria($id);
    }
}
?>
