// src/components/Posts.jsx
import React, { useEffect, useState } from 'react';
import './Posts.css';

const Posts = () => {
  const [photos, setPhotos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    fetch('https://jsonfakery.com/photos')
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="posts-section">
      <div className="posts-header">
        <h2>Social Media Posts</h2>
      </div>
      <div className="posts-grid">
        {photos.slice(0, visibleCount).map((photo) => (
          <div className="post-card" key={photo.id}>
            <img src={photo.photo_url} alt={photo.caption} />
            <div className="post-details">
              <p className="post-caption">{photo.caption}</p>
              <p className="post-date">{photo.created_at}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < photos.length && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Posts;
