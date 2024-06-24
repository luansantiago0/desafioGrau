"use client";
// UsuariosReport.jsx
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Header from "../../components/Header";
import useUserStore from "../../../store/userStore";

const UsuariosReport = () => {
  const { users, editUser, deleteUser } = useUserStore();

  const [editMode, setEditMode] = useState(false);
  const [userEditando, setUserEditando] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    console.log("Usuários carregados:", users);
  }, [users]);

  const handleEdit = (user) => {
    setUserEditando(user);
    setEditMode(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setShowConfirmDelete(false);
    }
  };

  const handleSaveEdit = () => {
    if (userEditando) {
      editUser(userEditando);
      setEditMode(false);
      setUserEditando(null);
    }
  };

  const handleCloseEdit = () => {
    setEditMode(false);
    setUserEditando(null);
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setUserEditando({ ...userEditando, [name]: value });
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1>Relatório de Usuários</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.categoria_nome}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(user)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" onClick={() => handleDelete(user)}>
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o usuário "
          {userToDelete ? userToDelete.nome : ""}"?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDelete(false)}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editMode} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={userEditando ? userEditando.nome : ""}
                onChange={handleChangeEdit}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userEditando ? userEditando.email : ""}
                onChange={handleChangeEdit}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                as="select"
                name="idcategoria"
                value={userEditando ? userEditando.idcategoria : ""}
                onChange={handleChangeEdit}
                required
              >
                <option value="1">Grátis</option>
                <option value="2">Normal</option>
                <option value="3">Prêmio</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsuariosReport;
