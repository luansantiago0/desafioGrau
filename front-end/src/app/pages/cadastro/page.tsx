"use client"; // Adicione esta linha no início do arquivo

import React, { useState } from "react";
import Link from "next/link";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("admin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/desafio_grau/back-end/index.php/usuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, email, senha, perfil }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      const data = await response.json();
      setSuccess("Usuário cadastrado com sucesso!");
      setError("");
      // Limpar campos após o cadastro
      setNome("");
      setEmail("");
      setSenha("");
      setPerfil("admin");
    } catch (error) {
      setError("Erro ao cadastrar usuário");
      setSuccess("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow-lg" style={{ width: "20rem" }}>
        <h1 className="text-center mb-4">Cadastro</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="perfil">Perfil</label>
            <select
              className="form-control"
              id="perfil"
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="visualizador">Visualizador</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Cadastrar
          </button>
          <p className="mt-3 text-center">
            Já tem uma conta? <Link href="/">Faça login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
