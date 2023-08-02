import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setLoading(true); // Iniciar la animación de carga
      searchMovies(searchTerm);
    }, 500); // Tiempo de espera de 500ms antes de realizar la búsqueda

    // Limpiar el temporizador cada vez que se escribe una nueva búsqueda
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const searchMovies = async (searchTerm) => {
    try {
      const apiKey = '4287ad07';
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
      setMovies(response.data.Search);
      setLoading(false); // Finalizar la animación de carga
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false); // Finalizar la animación de carga en caso de error
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Buscador de películas</h1>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar película"
        />
      </div>
      <div className="movie-grid">
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : (
          movies &&
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
