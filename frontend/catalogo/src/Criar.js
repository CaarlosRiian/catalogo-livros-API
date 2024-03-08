import React from 'react'

// api
import { useState, useEffect } from "react";

const urlLivros = "http://127.0.0.1:8000/livros/";
const urlAutores = "http://127.0.0.1:8000/autores/";


function Criar() {

    const [autores, setAutores] = useState([]);
    const [livros, setLivros] = useState([]);
    const [titulo, setTitulo] = useState([]);
    const [autor, setAutor] = useState([]);
    const [anoPublicado, setAnoPublicado] = useState([]);

// GET - Autores
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/autores/');
        const data = await response.json();
        setAutores(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

     // POST - Livros
   
     const handleCriarLivro = async (e) => {

        e.preventDefault();
  
        const livroCriado = {
          titulo,
          autor,
          ano_publicado: anoPublicado
        };
  
        const res = await fetch(urlLivros, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(livroCriado),
        });
        const addedLivro = await res.json();
        setLivros((prevLivros) => [...prevLivros, addedLivro]);
  
        setTitulo('');
        setAutor('');
        setAnoPublicado('');
    };
  return (
    <div><div className="criar-container">
    <a className='botao-voltar-criar' href={`/`}>Voltar</a>
    <h2 className="criar-title">Criar Livro</h2>
    <form>
    <label className="criar-label">
      Título:
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        onClick={(e) => console.log(e.target.value)}
        className="criar-input"
      />
    </label>
    <br />
    <label className="criar-label">
      Autor:
      <select
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        onClick={(e) => console.log(e.target.value)}
        className="criar-select"
      >
        <option value="">Selecione um autor</option>
        {autores.map((autor) => (
          <option key={autor.id} value={autor.id}>
            {autor.nome}
          </option>
        ))}
      </select>
    </label>
    <br />
    <label className="criar-label">
      Data:
      <input
        type="date"
        name="data"
        value={anoPublicado}
        onChange={(e) => setAnoPublicado(e.target.value)}
        onClick={(e) => console.log(e.target.value)}
        className="criar-input"
      />
    </label>
    <button onClick={handleCriarLivro} className="criar-button">
      Criar Livro
    </button>
    </form>
    
  </div></div>
    
  )
}

export default Criar