import { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './Homepage';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import { initializeTimes, updateTimes, submitAPI } from '../timesReducer';

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  // Function to submit form data to the API
  const submitForm = (formData) => {
    // Check global window.submitAPI or the imported fallback
    const isSubmitted =
      typeof window !== 'undefined' && typeof window.submitAPI === 'function'
        ? window.submitAPI(formData)
        : submitAPI(formData);

    if (isSubmitted) {
      navigate('/confirmed-booking');
    } else {
      alert('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
}

export default Main;