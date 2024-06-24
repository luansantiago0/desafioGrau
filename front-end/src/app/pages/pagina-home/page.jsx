"use client";
import React from "react";

import Header from "../../components/Header";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="min-h-screen d-flex flex-column align-items-center justify-content-center bg-cover">
        <div className="max-w-md mx-auto bg-success p-4 text-center text-white rounded-sm">
          <div className="bg-black bg-opacity-50 p-4 rounded-md">
            <h1 className="display-4 font-bold mb-4 text-white">Bem-vindo!</h1>
            <p className="lead mb-4 text-white">
              Este sistema tem como função cadastrar os clientes matriculados na
              academia Força do Hábito 🏃🏼.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
