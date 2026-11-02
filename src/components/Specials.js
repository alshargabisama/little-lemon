function Specials(){
   const specialsData = [
  {
    id: 1,
    title: "Greek Salad",
    price: "$12.99",
    description: "The famous Greek salad of crispy lettuce, peppers, olives, and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    image: "https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/main/src/images/greek%20salad.jpg"
  },
  {
    id: 2,
    title: "Bruschetta",
    price: "$5.99",
    description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    image: "https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/main/src/images/bruchetta.svg"
  },
  {
    id: 3,
    title: "Lemon Dessert",
    price: "$5.00",
    description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    image: "https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/main/src/images/lemon%20dessert.jpg"
  }
];

return (
    <section className="specials-section" id="menu">
      <div className="specials-header">
        <h2>This weeks specials!</h2>
        <button className="btn-primary">Online Menu</button>
      </div>
      <div className="specials-grid">
        {specialsData.map((item) => (
          <article className="special-card" key={item.id}>
            <img src={item.image} alt={item.title} className="card-img" />
            <div className="card-content">
              <div className="card-title-price">
                <h3>{item.title}</h3>
                <span className="price">{item.price}</span>
              </div>
              <p>{item.description}</p>
              <div className="card-delivery-action">
                <span>Order a delivery</span>
                <span className="delivery-icon">🚴</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Specials;