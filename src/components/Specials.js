import { useState } from 'react';

function Specials() {
  const [selectedDish, setSelectedDish] = useState(null);

  const specialsData = [
    {
      id: 1,
      title: "Greek Salad",
      price: "$12.99",
      description: "The famous Greek salad of crispy lettuce, peppers, olives, and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
      image: "/icons_assets/greek salad.jpg"
    },
    {
      id: 2,
      title: "Bruschetta",
      price: "$5.99",
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
      image: "/icons_assets/bruchetta.svg"
    },
    {
      id: 3,
      title: "Lemon Dessert",
      price: "$5.00",
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      image: "/icons_assets/lemon dessert.jpg"
    }
  ];

  const handleOrderClick = (dishTitle) => {
    setSelectedDish(dishTitle);
    alert(`🛒 Added "${dishTitle}" to your delivery order!`);
  };

  return (
    <section className="specials-section" id="menu">
      <div className="specials-header">
        <h2>This weeks specials!</h2>
        <button className="btn-primary" onClick={() => alert('Opening full online menu...')}>
          Online Menu
        </button>
      </div>
      <div className="specials-grid">
        {specialsData.map((item) => (
          <article 
            className={`special-card ${selectedDish === item.title ? 'card-selected' : ''}`} 
            key={item.id}
          >
            <div className="card-img-wrapper">
              <img src={item.image} alt={item.title} className="card-img" />
            </div>
            <div className="card-content">
              <div className="card-title-price">
                <h3>{item.title}</h3>
                <span className="price">{item.price}</span>
              </div>
              <p>{item.description}</p>
              <button 
                className="card-delivery-action"
                onClick={() => handleOrderClick(item.title)}
                aria-label={`Order a delivery for ${item.title}`}
              >
                <span>Order a delivery</span>
                <img 
                  src="/icons_assets/Dish icon.svg" 
                  alt="" 
                  style={{ width: "20px", height: "20px" }} 
                />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Specials;