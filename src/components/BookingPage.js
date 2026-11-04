import { useState, useEffect } from 'react';
import BookingForm from './BookingForm';

function BookingPage({ availableTimes, dispatch, submitForm }) {
  // 1. Initialize bookingData directly from localStorage
  const [bookingData, setBookingData] = useState(() => {
    const savedBookings = localStorage.getItem('bookingData');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  // 2. Synchronize bookingData changes to localStorage
  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
  }, [bookingData]);

  // 3. Handler to append new reservation to existing data
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

        {/* 4. Reservations Table: Shows existing data from localStorage */}
        <div className="booking-table-container">
          <h2>Current Reservations</h2>
          {bookingData.length === 0 ? (
            <p className="no-bookings-text">No reservations recorded yet. Book your table above!</p>
          ) : (
            <div className="table-responsive">
              <table className="booking-table" aria-label="Bookings List">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Seating</th>
                    <th>Occasion</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.date}</td>
                      <td>{booking.time}</td>
                      <td>{booking.guests}</td>
                      <td>{booking.seating}</td>
                      <td>{booking.occasion}</td>
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