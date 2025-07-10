import React, { useEffect, useState } from 'react';
import './Movies.css';
import { FiRefreshCw } from 'react-icons/fi'; // refresh icon

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const page = Math.floor(Math.random() * 10) + 1; // Random page
      const res = await fetch(`https://jsonfakery.com/movies/paginated?page=${page}`);
      const data = await res.json();
      const random4 = data.data.sort(() => 0.5 - Math.random()).slice(0, 4);
      setMovies(random4);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movies-section">
      <div className="movies-header">
        <h2>Movie Recommendations</h2>
        <button
          className={`refresh-btn ${loading ? 'rotating' : ''}`}
          onClick={fetchMovies}
          disabled={loading}
        >
          <FiRefreshCw />
        </button>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster_path} alt={movie.original_title} />
            <h4>{movie.original_title}</h4>
            <p>{movie.overview}</p>
            <div className="rating">⭐ {movie.vote_average}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
