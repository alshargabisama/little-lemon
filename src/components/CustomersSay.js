function CustomersSay() {
  const reviews = [
    { id: 1, rating: "★★★★★", name: "Sara M.", review: "Authentic flavours and fresh ingredients. Best Greek salad in town!" },
    { id: 2, rating: "★★★★★", name: "David K.", review: "Great ambiance and the Lemon Dessert is unmatched." },
    { id: 3, rating: "★★★★☆", name: "Maria L.", review: "Seamless online reservation and very friendly staff." },
    { id: 4, rating: "★★★★★", name: "James P.", review: "A genuine taste of the Mediterranean right here in Chicago." }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2>Testimonials</h2>
        <div className="testimonials-grid">
          {reviews.map((rev) => (
            <div className="testimonial-card" key={rev.id}>
              <div className="rating">{rev.rating}</div>
              <div className="customer-info">
                <div className="customer-avatar"></div>
                <h4>{rev.name}</h4>
              </div>
              <p className="review-text">"{rev.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomersSay;