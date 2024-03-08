import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Editar() {
    const { id } = useParams();
    const [livro, setLivro] = useState([]);
    const [titulo, setTitulo] = useState([]);
    const [autor, setAutor] = useState([]);
    const [anoPublicado, setAnoPublicado] = useState([]);
    const [autores, setAutores] = useState([]);
    // GET - Livro
    useEffect(() => {
        fetch(`http://localhost:8000/livros/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setLivro(data);
                console.log("consegui", data);
            })
            .catch((err) => console.log(err));
    }, []);
    
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

    // Update 
    const handleSubmit = (e) => {
        console.log('oi!');
        e.preventDefault();
        const livro = {
            titulo: titulo,
            autor: autor,
            ano_publicado: anoPublicado,
        };

        fetch(`http://localhost:8000/livros/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(livro),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao enviar PUT");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Dados atualizados com sucesso:", data);
            })
            .catch((error) => {
                console.error("Erro:", error);
            });

        console.log(livro);
    };

    return (
        <div className="App">
            <a className="botao-voltar-edit" href={`/`}>Voltar</a>
            <h1>Editando Livro</h1>
            <form onSubmit={handleSubmit}>
                <label>Título:</label>
                <input type="text" onChange={(e) => setTitulo(e.target.value)}/>
                <label>Ator:</label>
                <select 
                onClick={(e) => console.log(e.target.value)}
                onChange={(e) => setAutor(e.target.value)}
                >
                    <option value="">Selecionar um ator</option>
                    {autores.map((aut) => (
                        <option key={aut.id} value={aut.id}>
                            {aut.nome}
                        </option>
                    ))}
                </select>
                <label >Ano publicado:</label>
                <input type="date"  
                onChange={(e) => setAnoPublicado(e.target.value)}/>
                <input className="botao-editar-2" type="submit" value="Editar" onClick={handleSubmit}/>
            </form>
        </div>
    );
}

export default Editar;