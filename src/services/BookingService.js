const BOOKED_SEATS_KEY = "booked_seats";

export const getBookedSeats = (movieId) => {
  const allBookings = JSON.parse(localStorage.getItem(BOOKED_SEATS_KEY)) || [];
  return allBookings
    .filter((booking) => booking.movieId === movieId)
    .flatMap((booking) => booking.seats);
};

export const saveBooking = (movieId, userDetails, selectedSeats) => {
  const allBookings = JSON.parse(localStorage.getItem(BOOKED_SEATS_KEY)) || [];
  allBookings.push({
    movieId,
    user: userDetails,
    seats: selectedSeats,
  });
  localStorage.setItem(BOOKED_SEATS_KEY, JSON.stringify(allBookings));
};

export const clearAllBookings = () => {
  localStorage.removeItem(BOOKED_SEATS_KEY);
};

export const clearBookingsForMovie = (movieId) => {
  const allBookings = JSON.parse(localStorage.getItem(BOOKED_SEATS_KEY)) || [];
  const filtered = allBookings.filter((booking) => booking.movieId !== movieId);
  localStorage.setItem(BOOKED_SEATS_KEY, JSON.stringify(filtered));
};
