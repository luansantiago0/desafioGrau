<?php
require_once __DIR__ . '/../db.php';

class UsuarioModel {
    public static function cadastrarUsuario($dados) {
        global $pdo;
        $stmt = $pdo->prepare('INSERT INTO usuario (nome, email, senha, perfil) VALUES (:nome, :email, :senha, :perfil)');
        $stmt->execute([
            'nome' => $dados['nome'],
            'email' => $dados['email'],
            'senha' => password_hash($dados['senha'], PASSWORD_DEFAULT),
            'perfil' => $dados['perfil']
        ]);
        return $stmt->rowCount() > 0;
    }

    public static function listarUsuarios() {
        global $pdo;
        $stmt = $pdo->query('SELECT * FROM usuario');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function listarUsuarioPorId($id) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM usuario WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function atualizarUsuario($id, $dados) {
        global $pdo;
        $stmt = $pdo->prepare('UPDATE usuario SET nome = :nome, email = :email, senha = :senha, perfil = :perfil WHERE id = :id');
        $stmt->execute([
            'nome' => $dados['nome'],
            'email' => $dados['email'],
            'senha' => password_hash($dados['senha'], PASSWORD_DEFAULT),
            'perfil' => $dados['perfil'],
            'id' => $id
        ]);
        return $stmt->rowCount() > 0;
    }

    public static function deletarUsuario($id) {
        global $pdo;
        $stmt = $pdo->prepare('DELETE FROM usuario WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount() > 0;
    }

    public static function listarUsuarioPorEmail($email) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM usuario WHERE email = :email');
        $stmt->execute(['email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
