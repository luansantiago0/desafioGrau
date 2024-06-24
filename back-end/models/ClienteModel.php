<?php
require_once __DIR__ . '/../db.php';

class ClienteModel {
    public static function cadastrarCliente($dados) {
        global $pdo;
        $stmt = $pdo->prepare('INSERT INTO cliente (nome, email, telefone, idcategoria) VALUES (:nome, :email, :telefone, :idcategoria)');
        $stmt->execute([
            'nome' => $dados['nome'],
            'email' => $dados['email'],
            'telefone' => $dados['telefone'],
            'idcategoria' => $dados['idcategoria']
        ]);
        return $stmt->rowCount() > 0;
    }

    public static function listarClientes() {
        global $pdo;
        $stmt = $pdo->query('SELECT cliente.*, categoria.nome as categoria_nome FROM cliente JOIN categoria ON cliente.idcategoria = categoria.id');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function listarClientePorId($id) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM cliente WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function atualizarCliente($id, $dados) {
        global $pdo;
        $stmt = $pdo->prepare('UPDATE cliente SET nome = :nome, email = :email, telefone = :telefone, idcategoria = :idcategoria WHERE id = :id');
        $stmt->execute([
            'nome' => $dados['nome'],
            'email' => $dados['email'],
            'telefone' => $dados['telefone'],
            'idcategoria' => $dados['idcategoria'],
            'id' => $id
        ]);
        return $stmt->rowCount() > 0;
    }

    public static function deletarCliente($id) {
        global $pdo;
        $stmt = $pdo->prepare('DELETE FROM cliente WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount() > 0;
    }
}
?>
