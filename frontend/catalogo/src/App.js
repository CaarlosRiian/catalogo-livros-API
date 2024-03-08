import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [livros, setLivros] = useState([]);

  // GET - Livros
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/livros/');
        const data = await response.json();
        setLivros(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Deletando livros
  const handleDeletarLivro = async (livroId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/livros/${livroId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const updatedLivros = livros.filter(livro => livro.id !== livroId);
        setLivros(updatedLivros);
      } else {
        console.error('Erro ao deletar o livro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar o livro:', error);
    }
  };

  return (
    <div className="App">
      <h1>Listando Livros</h1>
      <a className="botao-criar" href={`/criar/`}>Criar Livro</a>
      <ul className="lista-livros">
        <li className="header-row">
          <div>Nome</div>
          <div>Autor</div>
          <div>Lançamento</div>
          <div>Ações</div>
        </li>
        {livros.map((livro) => (
          <li key={livro.id}>
            <div>{livro.titulo}</div>
            <div>{livro.autor}</div>
            <div>{livro.ano_publicado}</div>
            <div>
              <a className="botao-editar" href={`${livro.id}/editar/`}>
                Editar
              </a>
              <button className="botao-deletar" onClick={() => handleDeletarLivro(livro.id)}>
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
