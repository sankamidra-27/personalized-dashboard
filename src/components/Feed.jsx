import React, { useEffect, useState } from 'react';
import './Feed.css';
import Card from './Card';

const Feed = ({ favorites, setFavorites }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 3;

useEffect(() => {
  fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json')
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'ok') {
        setArticles(data.articles);

        // Add 2 random articles to favorites initially
        const shuffled = [...data.articles].sort(() => 0.5 - Math.random());
        const initialFavorites = shuffled.slice(0, 2);
        setFavorites(initialFavorites);
      }
    })
    .catch((err) => console.error('Error fetching news:', err));
}, []);


  const toggleFavorite = (article) => {
    const isAlreadyFav = favorites.some((fav) => fav.url === article.url);
    if (isAlreadyFav) {
      setFavorites(favorites.filter((fav) => fav.url !== article.url));
    } else {
      setFavorites([...favorites, article]);
    }
  };

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = currentPage * articlesPerPage;
  const visibleArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  const goToNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="feed">
      <h2>Personalized Feed</h2>
      <div className="cards">
        {visibleArticles.map((article, index) => (
          <Card
            key={index}
            image={article.urlToImage}
            title={article.title}
            description={article.description}
            buttonText="Read More"
            url={article.url}
            isFavorited={favorites.some((fav) => fav.url === article.url)}
            onToggleFavorite={() => toggleFavorite(article)}
          />
        ))}
      </div>

      <div className="pagination-buttons">
        <button onClick={goToPrev} disabled={currentPage === 0}>Prev</button>
        <span>{currentPage + 1} / {totalPages}</span>
        <button onClick={goToNext} disabled={currentPage === totalPages - 1}>Next</button>
      </div>

    </div>
  );
};

export default Feed;
