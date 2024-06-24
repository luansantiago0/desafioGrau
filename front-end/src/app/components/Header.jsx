// pages/index.js
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";

const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand ml-4" href="/pages/pagina-home">
            Força do Hábito
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Cadastrar
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/pages/cadastro-cliente">
                  Cliente
                </Dropdown.Item>
                <Dropdown.Item href="/pages/cadastro-usuario">
                  Usuário
                </Dropdown.Item>
                <Dropdown.Item href="/pages/cadastro-categoria">
                  Categoria
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Relátorio
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/pages/listar-cliente">
                  Cliente
                </Dropdown.Item>
                <Dropdown.Item href="/pages/listar-usuario">
                  Usuário
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
