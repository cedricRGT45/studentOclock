function Card({ cover, title }) {

    return (
        <DataFetcher url="http://localhost:3000/staff">
        <div className="cards">
            {data.map((professeur) => (
            <article className="cards__card" key={professeur.id} id={professeur.id}>
                <NavLink
                to={{
                    pathname: `/logement/${professeur.id}/${professeur.host.name}`,
                    state: data,
                }}
                >
                <img src={item.cover} alt="location" className="cards__card-img" />
                <div class="cards__card-bg">
                <p className="cards__card-title">{item.title}</p>
                </div>
                </NavLink>
            </article>
            ))}
        </div>
      </DataFetcher>
    );
  }
  
  export default Card;