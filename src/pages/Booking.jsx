import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookedSeats, saveBooking } from "../services/BookingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import movies from "../data/movies";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(id));
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const seats = getBookedSeats(id);
    setBookedSeats(seats);
  }, [id]);

  if (!movie) {
    return (
      <div className="home-container">
        <h2 className="home-title">Фільм не знайдено</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          Повернутися на головну
        </button>
      </div>
    );
  }

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  const handleBooking = () => {
    const { name, phone, email } = userDetails;
    if (!name || !phone || !email) {
      toast.error("Заповніть всі поля!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Невірний формат email!");
      return;
    }

    const phoneRegex = /^[\d\s+()-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Невірний формат телефону!");
      return;
    }

    saveBooking(id, userDetails, selectedSeats);
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    toast.success(`Успішно заброньовано ${selectedSeats.length} місць!`);

    setSelectedSeats([]);
    setUserDetails({ name: "", phone: "", email: "" });
    setShowForm(false);
  };

  const seats = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

  return (
    <div className="home-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Назад
      </button>

      <div className="movie-info-header">
        <img
          src={`/images/${movie.poster}`}
          alt={movie.title}
          className="movie-poster-small"
        />
        <div className="movie-details">
          <h2 className="home-title">{movie.title}</h2>
          <p className="movie-meta">
            <strong>Жанр:</strong> {movie.genre}
          </p>
          <p className="movie-meta">
            <strong>Сеанс:</strong> {movie.dateTime}
          </p>
        </div>
      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <span className="legend-box available"></span> Вільне
        </div>
        <div className="legend-item">
          <span className="legend-box selected"></span> Вибране
        </div>
        <div className="legend-item">
          <span className="legend-box booked"></span> Заброньовано
        </div>
      </div>

      <div className="cinema-hall">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`seat 
              ${bookedSeats.includes(seat) ? "booked" : ""}
              ${selectedSeats.includes(seat) ? "selected" : "available"}
            `}
            disabled={bookedSeats.includes(seat)}
          >
            {seat}
          </button>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="selected-seats">
          <strong>Вибрані місця ({selectedSeats.length}):</strong>
          <div className="seats-list">
            {selectedSeats.map((s) => (
              <span key={s} className="seat-chip">
                Місце {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {!showForm && selectedSeats.length > 0 && (
        <button className="book-btn" onClick={() => setShowForm(true)}>
          Забронювати
        </button>
      )}

      {showForm && (
        <form
          className="booking-form show"
          onSubmit={(e) => {
            e.preventDefault();
            handleBooking();
          }}
        >
          <input
            type="text"
            placeholder="Ім'я"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Телефон"
            value={userDetails.phone}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phone: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            required
          />
          <button type="submit">Підтвердити бронювання</button>
        </form>
      )}
    </div>
  );
};

export default Booking;
