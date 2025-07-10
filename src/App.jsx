import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Feed from './components/Feed';
import Favorites from './components/Favorites';
import Movies from './components/Movies';
import Posts from './components/Posts'; // Import Posts component
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [favorites, setFavorites] = useState([]);
  const [articles, setArticles] = useState([]);
  const [movies, setMovies] = useState([]);

  // Fetch news articles
  useEffect(() => {
    fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') setArticles(data.articles);
      })
      .catch(console.error);
  }, []);

  // Fetch movies
  useEffect(() => {
    fetch('https://jsonfakery.com/movies/paginated')
      .then((res) => res.json())
      .then((data) => setMovies(data.data))
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <Header articles={articles} movies={movies} />
        <div className="content">
          {activeTab === 'home' && (
            <>
              <div className="main-columns">
                <Feed
                  favorites={favorites}
                  setFavorites={setFavorites}
                  articles={articles}
                />
                <Favorites favorites={favorites} setFavorites={setFavorites} />
              </div>

              {/* Movies Section */}
              <div id="movies">
                <Movies movies={movies} />
              </div>

              {/* Posts Section */}
              <div id="posts">
                <Posts />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
