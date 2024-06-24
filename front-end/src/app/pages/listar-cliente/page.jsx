"use client";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Header from "../../components/Header";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const ClientesReport = () => {
  const [clientes, setClientes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/desafio_grau/back-end/index.php/cliente")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, []);

  const handleEdit = (cliente) => {
    setClienteEditando(cliente);
    setEditMode(true);
  };

  const handleDelete = (cliente) => {
    setClienteToDelete(cliente);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    if (clienteToDelete) {
      axios
        .delete(
          `http://localhost/desafio_grau/back-end/index.php/cliente/${clienteToDelete.id}`
        )
        .then(() => {
          setClientes(clientes.filter((c) => c.id !== clienteToDelete.id));
          setShowConfirmDelete(false);
        })
        .catch((error) => {
          console.error("Erro ao excluir cliente:", error);
        });
    }
  };

  const handleSaveEdit = () => {
    if (clienteEditando) {
      axios
        .put(
          `http://localhost/desafio_grau/back-end/index.php/cliente/${clienteEditando.id}`,
          clienteEditando
        )
        .then(() => {
          setClientes(
            clientes.map((c) =>
              c.id === clienteEditando.id ? clienteEditando : c
            )
          );
          setEditMode(false);
          setClienteEditando(null);
        })
        .catch((error) => {
          console.error("Erro ao editar cliente:", error);
        });
    }
  };

  const handleCloseEdit = () => {
    setEditMode(false);
    setClienteEditando(null);
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    const updatedClienteEditando = {
      ...clienteEditando,
      [name]: name === "idcategoria" ? parseInt(value) : value,
    };
    setClienteEditando(updatedClienteEditando);
  };

  // Preparando dados para o gráfico de pizza
  const categorias = {};
  clientes.forEach((cliente) => {
    if (categorias[cliente.categoria_nome]) {
      categorias[cliente.categoria_nome]++;
    } else {
      categorias[cliente.categoria_nome] = 1;
    }
  });

  const data = {
    labels: Object.keys(categorias),
    datasets: [
      {
        data: Object.values(categorias),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9933",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9933",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1>Relatório de Clientes</h1>
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
            {clientes.map((cliente, index) => (
              <tr key={cliente.id}>
                <td>{index + 1}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.categoria_nome}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(cliente)}>
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(cliente)}
                  >
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
          Tem certeza que deseja excluir o cliente "
          {clienteToDelete ? clienteToDelete.nome : ""}"?
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
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={clienteEditando ? clienteEditando.nome : ""}
                onChange={handleChangeEdit}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={clienteEditando ? clienteEditando.email : ""}
                onChange={handleChangeEdit}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                as="select"
                name="idcategoria"
                value={clienteEditando ? clienteEditando.idcategoria : ""}
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

      <div className="container mt-5">
        <h2>Distribuição de Clientes por Categoria</h2>
        <div className="chart-container">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ClientesReport;
