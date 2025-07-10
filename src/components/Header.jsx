import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaUserCog, FaUser } from 'react-icons/fa';
import AccountModal from './AccountModal';

const Header = ({ articles, movies }) => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setSearchResult(null);
      return;
    }

    const foundArticle = articles.find((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    const foundMovie = movies.find((item) =>
      item.original_title.toLowerCase().includes(value.toLowerCase())
    );

    if (foundArticle) {
      setSearchResult({ type: 'article', data: foundArticle });
    } else if (foundMovie) {
      setSearchResult({ type: 'movie', data: foundMovie });
    } else {
      setSearchResult({ type: 'none' });
    }
  };

  // Escape key to close search modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSearchResult(null);
        setQuery('');
      }
    };

    if (searchResult) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [searchResult]);

  return (
    <div className="header">
      <input
        type="text"
        placeholder="Search movies or news..."
        value={query}
        onChange={handleSearch}
      />
      <div className="actions">
        <span><FaUserCog /> User Settings</span>
        <span onClick={() => setShowAccountModal(true)} style={{ cursor: 'pointer' }}>
          <FaUser /> Account
        </span>
      </div>

      {showAccountModal && <AccountModal onClose={() => setShowAccountModal(false)} />}

      {searchResult && (
        <div className="search-modal">
          {searchResult.type === 'article' && (
            <div className="search-card">
              <img src={searchResult.data.urlToImage} alt="news" />
              <h4>{searchResult.data.title}</h4>
              <p>{searchResult.data.description}</p>
              <a href={searchResult.data.url} target="_blank" rel="noreferrer">
                Read More
              </a>
            </div>
          )}
          {searchResult.type === 'movie' && (
            <div className="search-card">
              <img src={searchResult.data.poster_path} alt="movie" />
              <h4>{searchResult.data.original_title}</h4>
              <p>{searchResult.data.overview}</p>
              <span>⭐ {searchResult.data.vote_average}</span>
            </div>
          )}
          {searchResult.type === 'none' && (
            <div className="search-card"><p>No results found.</p></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
