"use client";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Header from "../../components/Header";
import axios from "axios";

const CadastroCliente = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [category, setCategory] = useState("1"); // Use the actual id for default category
  const [categories] = useState([
    { id: 1, name: "Grátis" },
    { id: 2, name: "Normal" },
    { id: 3, name: "Prêmio" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicionar lógica para salvar o cliente
    axios
      .post("http://localhost/desafio_grau/back-end/index.php/cliente", {
        nome: name, // O backend espera 'nome'
        email: email,
        telefone: telefone,
        idcategoria: category, // Certifique-se de que o backend espera 'idcategoria'
      })
      .then(() => {
        alert("Cliente cadastrado");
        window.location.href = "/pages/cadastro-cliente"; // Redirecionamento após o submit
      })
      .catch((error) => {
        console.error("Erro ao cadastrar cliente:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1>Cadastro de Cliente</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Cliente</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email do Cliente</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefone do Cliente</Form.Label>
            <Form.Control
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
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

export default CadastroCliente;
