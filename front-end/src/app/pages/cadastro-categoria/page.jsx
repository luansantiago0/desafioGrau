"use client";
// NewCategory.jsx
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../components/Header";

const NewCategory = () => {
  const [category, setCategory] = useState("Grátis");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicionar lógica para salvar a categoria
    axios
      .post("http://localhost/desafio_grau/back-end/index.php/categoria", {
        nome: category,
      })
      .then(() => {
        alert("Categoria cadastrada com sucesso!");
        window.location.href = "/pages/cadastro-categoria"; // Redirecionamento após o submit
      })
      .catch((error) => {
        console.error("Erro ao cadastrar categoria:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1>Cadastro de Categoria</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Grátis">Grátis</option>
              <option value="Normal">Normal</option>
              <option value="Prêmio">Prêmio</option>
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

export default NewCategory;
