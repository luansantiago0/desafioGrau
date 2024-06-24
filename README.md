# Desafio GrauTecnico

Este é um projeto desenvolvido com React utilizando Next.js, Axios para requisições HTTP, Bootstrap para estilização, Chart.js para gráficos, e Zustand para gerenciamento de estado, PHP para criação da API e MySQL para criação do banco de dados.

## Requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado em seu ambiente de desenvolvimento:

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js) ou yarn (opcional, mas recomendado)

### Requisitos para API PHP e Banco de Dados MySQL com XAMPP

Certifique-se de que o ambiente para a API PHP e o banco de dados MySQL utilizando XAMPP esteja configurado corretamente:

1. **XAMPP**

   - XAMPP é um pacote de software livre que contém o Apache HTTP Server, MySQL, PHP e Perl. Certifique-se de ter o XAMPP instalado e em execução em seu ambiente de desenvolvimento.
   - Certifique-se de que o Apache e o MySQL no XAMPP estejam iniciados.

2. **Configuração do Banco de Dados MySQL no XAMPP**

   - Inicie o painel de controle do XAMPP.
   - Inicie o módulo MySQL.
   - Acesse o phpMyAdmin (gerenciador de banco de dados MySQL do XAMPP) em seu navegador.
   - Crie um novo banco de dados para o projeto.
   - Importe ou crie as tabelas necessárias para o projeto dentro do phpMyAdmin.

3. **Configuração da API PHP**

   - Certifique-se de que a API PHP esteja configurada para se comunicar com o banco de dados MySQL no XAMPP.
   - Configure corretamente as rotas e métodos da API PHP de acordo com as necessidades do frontend.

## Instalação do projeto

1. **Clone o repositório do frontend**

   ```bash
   git clone https://github.com/luansantiago0/desafioGrau
   ```
   ### Dentro da pasta do projeto (front-end) rode os seguintes comandos para instalar e rodar o projeto
   ```bash
   npm install
   npm run dev
   ```

# Configuração da API PHP com Banco de Dados MySQL

Este é um guia básico para configurar a API PHP para se comunicar com o banco de dados MySQL utilizando PDO.

## Requisitos

Antes de começar, certifique-se de ter o seguinte:

- XAMPP ou outro servidor local que inclua PHP e MySQL.
- Um editor de código (por exemplo, Visual Studio Code, Sublime Text, etc.).
- Conhecimento básico de PHP e SQL.

## Passos para Configuração

Siga os passos abaixo para configurar sua API PHP para se conectar ao banco de dados MySQL:

### 1. Configuração do Banco de Dados MySQL

- Abra o painel de controle do XAMPP.
- Inicie o módulo MySQL, se ainda não estiver iniciado.
- Acesse o phpMyAdmin em seu navegador (geralmente acessível via http://localhost/phpmyadmin/).
- Crie um novo banco de dados chamado `forca_do_habito` (ou outro nome de sua escolha).

### 2. Configuração do Arquivo de Conexão com o Banco de Dados

Dentro do arquivo chamado `db.php` (ou outro nome de sua escolha) e adicione o seguinte código:

```php
<?php
$dsn = 'mysql:host=localhost;dbname=forca_do_habito';
$username = 'root';
$password = '';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão estabelecida com sucesso!";
} catch (PDOException $e) {
    die('Conexão falhou: ' . $e->getMessage());
}
?>
   
   
