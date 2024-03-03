import logo from './logo.svg';

// api
import { useState, useEffect } from "react";

// css
import './App.css';

// urls
const urlAutores = "http://127.0.0.1:8000/autores/";
const urlLivros = "http://127.0.0.1:8000/livros/";

function App() {

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
        // Livro deletado com sucesso
        console.log(`Livro com ID ${livroId} deletado com sucesso.`);
        
        // Atualize a lista de livros no estado ou faça qualquer outra atualização necessária
        const updatedLivros = livros.filter(livro => livro.id !== livroId);
        setLivros(updatedLivros);
      } else {
        // Trate erros caso a requisição não seja bem-sucedida
        console.error('Erro ao deletar o livro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar o livro:', error);
    }
  };

  return (
    <div className="App">
      <h1>Listando Autores</h1>
      <ul>
        {autores.map((autor) => (
          <li key={autor.id}>{autor.nome}</li>
        ))}
      </ul>
      <h1>Listando Livros</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            <div>{livro.titulo}</div>
            <div><button onClick={() => handleDeletarLivro(livro.id)}>
                            Deletar
                        </button></div>
            </li>
          
        ))}
      </ul>
      <h2>Criar Livro</h2>
      <label>
        Título:
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} 
        onClick={(e) => console.log(e.target.value)}/>
      </label>
      <br />
      <label>
        Autor:
        <select value={autor} onChange={(e) => setAutor(e.target.value)}
        onClick={(e) => console.log(e.target.value)}>
            <option value="">Selecione um autor</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            ))}
          </select>
      </label>
      <br />
      <label>
        Data:
        <input type="date" name="data" value={anoPublicado} 
        onChange={(e) => setAnoPublicado(e.target.value)}
        onClick={(e) => console.log(e.target.value)}/>
      </label>
      <button onClick={handleCriarLivro}>Criar Livro</button>
    </div>
  );
}

export default App;
