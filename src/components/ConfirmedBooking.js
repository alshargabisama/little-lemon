import { Link } from 'react-router-dom';

function ConfirmedBooking() {
  return (
    <section className="confirmed-booking-wrapper" aria-label="Booking confirmation">
      <div className="confirmed-card">
        <div className="success-icon-wrapper">
          <svg
            className="success-checkmark"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-lead">
          Your table reservation at Little Lemon Chicago has been successfully placed.
        </p>
        <p className="confirmation-note">
          A confirmation SMS and email have been dispatched. We look forward to hosting you!
        </p>
        <Link to="/" className="btn-primary back-home-btn">
          Back to Homepage
        </Link>
      </div>
    </section>
  );
}

export default ConfirmedBooking;