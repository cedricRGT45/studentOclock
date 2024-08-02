function Card({ cover, title }) {

    return (
      <div className="cards">
        {data.map((item) => (
          <article className="cards__card" key={item.id} id={item.id}>
            <NavLink
              to={{
                pathname: `/logement/${item.id}/${item.host.name}`,
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
    );
  }
  
  export default Card;