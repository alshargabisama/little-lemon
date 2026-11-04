import { useNavigate } from 'react-router-dom';

function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family-owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
          </p>
          <button 
            className="btn-primary" 
            onClick={() => navigate('/booking')}
          >
            Reserve a Table
          </button>
        </div>
        <div className="hero-image-wrapper">
          <img 
            src="/icons_assets/restauranfood.jpg" 
            alt="Little Lemon restaurant food tray" 
            className="hero-img" 
          />
        </div>
      </div>
    </section>
  );
}

export default CallToAction;