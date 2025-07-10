import React from 'react';
import './Sidebar.css';
import { FaHome, FaHeart, FaSearch, FaCog, FaFilm, FaImage } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <li
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => setActiveTab('home')}
        >
          <FaHome /> Home
        </li>
        <li
          className={activeTab === 'favorites' ? 'active' : ''}
          onClick={() => setActiveTab('favorites')}
        >
          <FaHeart /> Favorites
        </li>
        <li onClick={() => scrollToSection('movies')}>
          <FaFilm /> Movies
        </li>
        <li onClick={() => scrollToSection('posts')}>
          <FaImage /> Posts
        </li>
        <li>
          <FaCog /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
