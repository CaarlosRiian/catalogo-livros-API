import "./App.css";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

function Editar() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [anoPublicado, setAnoPublicado] = useState('');
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
            setTitulo(data.titulo);
            setAutor(data.autor || ''); 
            setAnoPublicado(data.ano_publicado);
            console.log("consegui", data);
        })
        .catch((err) => console.log(err));
}, [id]);

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
    const handleSubmit = useCallback((e) => {
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
                alert("Dados atualizados com sucesso:", data);
            })
            .catch((error) => {
                console.error("Erro:", error);
            });

        console.log(livro);
    }, [id, titulo, autor, anoPublicado]);

    return (
        <div className="App">
            <a className="botao-voltar-edit" href={`/`}>Voltar</a>
            <h1>Editando Livro</h1>
            <form onSubmit={handleSubmit}>
                <label>Título:</label>
                <input type="text" value={titulo || ''} onChange={(e) => setTitulo(e.target.value)}/>
                <label>Autor:</label>
                <select 
                    onClick={(e) => console.log(e.target.value)}
                    onChange={(e) => setAutor(e.target.value)}
                    value={autor || ''}
                >
                    <option value="">Selecionar um autor</option>
                    {autores.map((aut) => (
                        <option key={aut.id} value={aut.id}>
                            {aut.nome}
                        </option>
                    ))}
                </select>
                <label>Ano publicado:</label>
                <input type="date" value={anoPublicado || ''} onChange={(e) => setAnoPublicado(e.target.value)}/>
                <input className="botao-editar-2" type="submit" value="Editar" onClick={handleSubmit}/>
            </form>
        </div>
    );
}

export default Editar;
