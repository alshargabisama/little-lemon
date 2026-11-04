import { useState, useRef, useEffect } from 'react';

function BookingForm({ availableTimes, dispatch, onBookingSubmit }) {
  // 1. Default date to today's date in local YYYY-MM-DD
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [date, setDate] = useState(getTodayString());
  const [time, setTime] = useState(availableTimes?.[0] || '17:00');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('');
  const [seating, setSeating] = useState('Indoor');
  const [comments, setComments] = useState('');

  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const dropdownRef = useRef(null);

  const occasionsList = ['Birthday', 'Engagement', 'Anniversary'];

  // Keep selected time synchronized whenever availableTimes updates
  useEffect(() => {
    if (availableTimes && availableTimes.length > 0) {
      // If the current selected time is no longer in availableTimes, select the first available
      if (!availableTimes.includes(time)) {
        setTime(availableTimes[0]);
      }
    }
  }, [availableTimes, time]);

  // Handle Date Change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (dispatch) {
      dispatch({ type: 'UPDATE_TIMES', payload: selectedDate });
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOccasionOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOccasionSelect = (selectedOption) => {
    setOccasion(selectedOption);
    setIsOccasionOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      alert('Please choose a valid date.');
      return;
    }

    if (!time) {
      alert('No available time slots for this date. Please pick another date.');
      return;
    }

    // Strict duplicate check reading from localStorage
    const saved = localStorage.getItem('bookingData');
    const existingBookings = saved ? JSON.parse(saved) : [];

    const isDuplicate = existingBookings.some(
      (b) => String(b.date).trim() === String(date).trim() && String(b.time).trim() === String(time).trim()
    );

    if (isDuplicate) {
      alert(`⚠️ Conflict: ${time} on ${date} is already reserved. Please select another time.`);
      return;
    }

    const formData = {
      date: date.trim(),
      time: time.trim(),
      guests,
      occasion: occasion || 'None',
      seating,
      comments,
    };

    // 1. Remove the slot from the active dropdown immediately
    if (dispatch) {
      dispatch({ type: 'BOOK_TIME', payload: time });
    }

    // 2. Submit to BookingPage (which updates localStorage and navigates)
    if (onBookingSubmit) {
      onBookingSubmit(formData);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} aria-label="Table reservation form">
      {/* Seating Preference Toggle */}
      <div className="form-group">
        <label className="group-label">Seating Preference</label>
        <div className="seating-toggle">
          <label className={`toggle-option ${seating === 'Indoor' ? 'active' : ''}`}>
            <input
              type="radio"
              name="seating"
              value="Indoor"
              checked={seating === 'Indoor'}
              onChange={(e) => setSeating(e.target.value)}
            />
            Indoor Seating
          </label>
          <label className={`toggle-option ${seating === 'Outdoor' ? 'active' : ''}`}>
            <input
              type="radio"
              name="seating"
              value="Outdoor"
              checked={seating === 'Outdoor'}
              onChange={(e) => setSeating(e.target.value)}
            />
            Outdoor Patio
          </label>
        </div>
      </div>

      {/* Date & Time Row */}
      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="res-date">Choose Date</label>
          <input
            type="date"
            id="res-date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="form-group flex-1">
          <label htmlFor="res-time">Choose Time</label>
          <div className="custom-select-wrapper">
            <select
              id="res-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              {availableTimes && availableTimes.length > 0 ? (
                availableTimes.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))
              ) : (
                <option value="">No times available</option>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Guests & Custom Occasion Row */}
      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="guests">Number of Guests</label>
          <input
            type="number"
            id="guests"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
          />
        </div>

        {/* Custom Occasion Selector */}
        <div className="form-group flex-1">
          <label id="occasion-label">Occasion</label>
          <div className="figma-dropdown-container" ref={dropdownRef}>
            <button
              type="button"
              className={`figma-dropdown-header ${occasion ? 'selected-state' : ''}`}
              onClick={() => setIsOccasionOpen(!isOccasionOpen)}
              aria-haspopup="listbox"
              aria-expanded={isOccasionOpen}
              aria-labelledby="occasion-label"
            >
              <div className="figma-dropdown-left">
                <svg
                  className="occasion-icon"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 22h8M12 15v7M5 3l2 8a5 5 0 0 0 10 0l2-8H5z" />
                </svg>
                <span className="occasion-title-text">
                  {occasion || 'Occasion'}
                </span>
              </div>
              <span className={`figma-chevron ${isOccasionOpen ? 'chevron-up' : ''}`}>
                ▼
              </span>
            </button>

            {isOccasionOpen && (
              <ul className="figma-dropdown-menu" role="listbox">
                {occasionsList.map((item) => (
                  <li
                    key={item}
                    role="option"
                    aria-selected={occasion === item}
                    className={`figma-dropdown-item ${occasion === item ? 'active-item' : ''}`}
                    onClick={() => handleOccasionSelect(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="form-group">
        <label htmlFor="comments">Special Requests (Optional)</label>
        <textarea
          id="comments"
          rows="3"
          placeholder="Dietary requirements, wheelchair access, high chairs..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>
      </div>

      {/* Submit CTA */}
      <button 
        type="submit" 
        className="btn-primary form-submit-btn" 
        aria-label="Confirm and make reservation"
      >
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;