"use client";
import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/desafio_grau/back-end/index.php/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        }
      );

      const text = await response.text(); // Obtém a resposta como texto
      console.log("Raw response:", text); // Log da resposta bruta

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = JSON.parse(text); // Analisa o texto como JSON

      if (data.success) {
        setSuccess("Login bem-sucedido!");
        setError("");
        // Redirecionar o usuário para a página inicial ou painel após 1 segundo
        setTimeout(() => {
          window.location.href = "/pages/pagina-home"; // Redirecionamento usando window.location.href
        }, 1000);
      } else {
        setError(data.message || "Erro desconhecido ao fazer login");
        setSuccess("");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError(error.message || "Erro ao fazer login");
      setSuccess("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow-lg" style={{ width: "20rem" }}>
        <h1 className="text-center mb-4">Login</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Entrar
          </button>
          <p className="mt-3 text-center">
            Ainda não tem uma conta?{" "}
            <Link href="/pages/cadastro">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
