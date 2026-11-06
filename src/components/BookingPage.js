import { useState, useEffect } from 'react';
import BookingForm from './BookingForm';

function BookingPage({ availableTimes, dispatch, submitForm }) {
  const [bookingData, setBookingData] = useState(() => {
    const savedBookings = localStorage.getItem('bookingData');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
  }, [bookingData]);

  const handleBookingSubmit = (newBooking) => {
    setBookingData((prevBookings) => {
      const updatedBookings = [...prevBookings, newBooking];
      localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
      return updatedBookings;
    });

    if (submitForm) {
      submitForm(newBooking);
    }
  };

  return (
    <div className="booking-page-wrapper">
      <div className="booking-banner">
        <div className="booking-banner-content">
          <h1>Reserve a Table</h1>
          <p>
            Experience authentic Mediterranean dishes crafted by Mario & Adrian. 
            Select your preferred seating and time below.
          </p>
        </div>
      </div>

      <div className="booking-content-container">
        <div className="booking-form-card">
          <BookingForm 
            availableTimes={availableTimes} 
            dispatch={dispatch} 
            onBookingSubmit={handleBookingSubmit}
          />
        </div>

        {/* Reservations Table */}
        <div className="booking-table-container">
          <h2>Current Reservations</h2>
          {bookingData.length === 0 ? (
            <p className="no-bookings-text">No reservations recorded yet. Book your table above!</p>
          ) : (
            <div className="table-responsive">
              <table className="booking-table" aria-label="Bookings List">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Seating</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.fullName}</td>
                      <td>{booking.email}</td>
                      <td>{booking.date}</td>
                      <td>{booking.time}</td>
                      <td>{booking.guests}</td>
                      <td>{booking.seating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingPage;