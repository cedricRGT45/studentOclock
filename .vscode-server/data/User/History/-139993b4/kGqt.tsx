export function SubjectCard({ subject }) {
  return (
    <div className="cards">
      <article className="cards__card" key={subject.id}>
        <img src={subject.image} alt="subject" className="cards__card-img" />
        <div className="cards__card-bg">
          <p className="cards__title">{subject.name}</p>
          <p className="cards__description">{subject.description}</p>
        </div>
      </article>
    </div>
  );
}
