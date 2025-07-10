import React from 'react';
import './Card.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Card = ({
  image,
  title,
  description,
  buttonText,
  url,
  isFavorited,
  onToggleFavorite,
}) => {
  return (
    <div className="card">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button>{buttonText}</button>
      </a>

      {/* ❤️ Heart Icon */}
      <div
        className={`heart-icon ${isFavorited ? 'favorited' : ''}`}
        onClick={onToggleFavorite}
      >
        {isFavorited ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
};

export default Card;
