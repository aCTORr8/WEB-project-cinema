import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBooking = () => {
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <img src={`/images/${movie.poster}`} alt={movie.title} />
      <h3>{movie.title}</h3>

      <div className="info">
        <strong>Жанр: </strong>
        {movie.genre}
      </div>

      <div className={`description ${isExpanded ? "expanded" : ""}`}>
        {movie.description}
      </div>

      <button className="toggle-btn" onClick={toggleDescription}>
        {isExpanded ? "Менше" : "Більше"}
      </button>

      <div className="session-info">
        <strong>Сеанс: </strong>
        {movie.dateTime}
      </div>

      <button className="toggle-btn toggle-btn2" onClick={handleBooking}>
        Забронювати
      </button>
    </div>
  );
};

export default MovieCard;
