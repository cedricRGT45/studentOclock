function Card({ cover, title }) {

    return (
        <DataFetcher url="http://localhost:3000/staff">
        <div className="cards">
            {data.map((professeur) => (
            <article className="cards__card" key={professeur.id} id={professeur.id}>
                <img src={professeur.image} alt="location" className="cards__card-img" />
                <div class="cards__card-bg">
                <p className="cards__card-title">{professeur.title}</p>
                </div>
                </NavLink>
            </article>
            ))}
        </div>
      </DataFetcher>
    );
  }
  
  export default Card;