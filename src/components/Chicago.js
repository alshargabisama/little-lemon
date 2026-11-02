function Chicago() {
  return (
    <section className="chicago-section" id="about">
      <div className="chicago-container">
        <div className="chicago-text">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            Little Lemon was opened in 1995 by two Italian brothers, Adrian and Mario. 
            Despite the city's diversity of culinary choices, they noticed a lack of 
            authentic Mediterranean cuisine and set out to bring traditional recipes to life.
          </p>
          <p>
            Today, they blend classic recipes with modern cooking techniques to create
            wholesome dishes inspired by childhood memories from the Mediterranean coast.
          </p>
        </div>
        <div className="chicago-images">
          <img 
            src="https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/main/src/images/Mario%20and%20Adrian%20A.jpg" 
            alt="Mario and Adrian cooking" 
            className="about-img img-back" 
          />
          <img 
            src="https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/main/src/images/Mario%20and%20Adrian%20b.jpg" 
            alt="Mario and Adrian in the restaurant" 
            className="about-img img-front" 
          />
        </div>
      </div>
    </section>
  );
}

export default Chicago;