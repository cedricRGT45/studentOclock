export function SubjectCard({ subject }) {
  return (
    <article className="cards__card" key={subject.id}>
      <img src={subject.image} alt="subject" className="cards__img" />
      <div>
        <h2 className="cards__title">{subject.name}</h2>
        <p className="cards__subtitle">{subject.description}</p>
      </div>
    </article>
  );
}
