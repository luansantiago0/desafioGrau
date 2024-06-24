<?php
require_once __DIR__ . '/../db.php';

class CategoriaModel {
    public static function cadastrarCategoria($nome) {
        global $pdo;
        $stmt = $pdo->prepare('INSERT INTO categoria (nome) VALUES (:nome)');
        return $stmt->execute(['nome' => $nome]);
    }

    public static function listarCategorias() {
        global $pdo;
        $stmt = $pdo->query('SELECT * FROM categoria');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function listarCategoriaPorId($id) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM categoria WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function atualizarCategoria($id, $nome) {
        global $pdo;
        $stmt = $pdo->prepare('UPDATE categoria SET nome = :nome WHERE id = :id');
        return $stmt->execute(['nome' => $nome, 'id' => $id]);
    }

    public static function deletarCategoria($id) {
        global $pdo;
        $stmt = $pdo->prepare('DELETE FROM categoria WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }
}
?>
