"use client";
// NewUser.jsx
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Header from "../../components/Header";
import useUserStore from "../../../store/userStore";

const NewUser = () => {
  const addUser = useUserStore((state) => state.addUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("viewer");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now(); // Gera um ID simples único
    addUser({ id, nome: name, email, categoria_nome: profile });
    alert("Usuário cadastrado com sucesso!");
    setName("");
    setEmail("");
    setProfile("viewer");
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1>Cadastro de Usuário</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Perfil</Form.Label>
            <Form.Select
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              required
            >
              <option value="viewer">Vizualizador</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewUser;
