import React from 'react';
import './Favorites.css';

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites">
      <h3>Favorites</h3>
      {favorites.length === 0 ? (
        <p className="empty-msg">No favorites yet ❤️</p>
      ) : (
        <ul className="favorite-list">
          {favorites.map((article, index) => (
            <li key={index} className="favorite-item">
              <span className="fav-title">{article.title}</span>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <button className="open-button">Open</button>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
