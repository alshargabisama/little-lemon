import { useState, useRef, useEffect } from 'react';

function BookingForm({ availableTimes, dispatch, onBookingSubmit }) {
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Step Management: 1 = Reservation Details, 2 = Personal Info
  const [step, setStep] = useState(1);

  // Reservation Info (Now Step 1)
  const [date, setDate] = useState(getTodayString());
  const [time, setTime] = useState(availableTimes?.[0] || '17:00');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('');
  const [seating, setSeating] = useState('Indoor');
  const [comments, setComments] = useState('');

  // Contact Info (Now Step 2)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const dropdownRef = useRef(null);

  const occasionsList = ['Birthday', 'Engagement', 'Anniversary'];

  useEffect(() => {
    if (availableTimes && availableTimes.length > 0) {
      if (!availableTimes.includes(time)) {
        setTime(availableTimes[0]);
      }
    }
  }, [availableTimes, time]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (dispatch) {
      dispatch({ type: 'UPDATE_TIMES', payload: selectedDate });
    }
  };

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

  const isStep1Valid = Boolean(date) && Boolean(time) && guests >= 1 && guests <= 10;
  const isStep2Valid = Boolean(fullName.trim()) && Boolean(email.trim()) && Boolean(phone.trim());

  const goToStep1 = () => setStep(1);
  const goToStep2 = (e) => {
    e.preventDefault();
    if (!isStep1Valid) {
      alert('Please select a valid date, time, and guest count.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isStep2Valid) {
      alert('Please fill out all contact information fields before submitting.');
      return;
    }

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
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date: date.trim(),
      time: time.trim(),
      guests,
      occasion: occasion || 'None',
      seating,
      comments,
    };

    if (dispatch) {
      dispatch({ type: 'BOOK_TIME', payload: time });
    }

    if (onBookingSubmit) {
      onBookingSubmit(formData);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} aria-label="Table reservation form" noValidate>
      
      {/* Clickable Progress Bar Header */}
      <div className="form-steps-indicator">
        <button 
          type="button" 
          className={`step-pill ${step === 1 ? 'active' : 'completed'}`}
          onClick={goToStep1}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          <span>1</span> Reservation Details
        </button>
        <button 
          type="button" 
          className={`step-pill ${step === 2 ? 'active' : ''}`}
          onClick={(e) => {
            if (isStep1Valid) setStep(2);
            else alert('Please complete the reservation details first.');
          }}
          style={{ border: 'none', cursor: isStep1Valid ? 'pointer' : 'not-allowed' }}
        >
          <span>2</span> Personal Info
        </button>
      </div>

      {/* STEP 1: Reservation Details */}
      {step === 1 && (
        <div className="form-step-content">
          <div className="form-section-title">Table & Time Preferences</div>

          {/* Seating Preference Toggle */}
          <div className="form-group">
            <span className="group-label">Seating Preference</span>
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
              <label htmlFor="res-date">Choose Date *</label>
              <input
                type="date"
                id="res-date"
                value={date}
                min={getTodayString()}
                onChange={handleDateChange}
                required
                aria-required="true"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="res-time">Choose Time *</label>
              <div className="custom-select-wrapper">
                <select
                  id="res-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  aria-required="true"
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
              <label htmlFor="guests">Number of Guests (1-10) *</label>
              <input
                type="number"
                id="guests"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                required
                aria-required="true"
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
                  aria-label="On Click"
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

          <button 
            type="button" 
            className={`btn-primary form-submit-btn ${!isStep1Valid ? 'btn-disabled' : ''}`}
            onClick={goToStep2}
            disabled={!isStep1Valid}
            aria-label="On Click"
          >
            Continue to Personal Info &rarr;
          </button>
        </div>
      )}

      {/* STEP 2: Personal Details */}
      {step === 2 && (
        <div className="form-step-content">
          <div className="form-section-title">Your Contact Details</div>
          
          <div className="form-group">
            <label htmlFor="full-name">Full Name *</label>
            <input
              type="text"
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
              required
              aria-required="true"
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="email">E-mail *</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                autoComplete="email"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                autoComplete="tel"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-actions-row">
            <button 
              type="button" 
              className="btn-secondary-back"
              onClick={goToStep1}
            >
              &larr; Back
            </button>
            <button 
              type="submit" 
              className={`btn-primary form-submit-btn ${!isStep2Valid ? 'btn-disabled' : ''}`}
              disabled={!isStep2Valid}
              aria-label="On Click"
            >
              Make Your Reservation
            </button>
          </div>
        </div>
      )}
    </form>
  );
}


export default BookingForm;