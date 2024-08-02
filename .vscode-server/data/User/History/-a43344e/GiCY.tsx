export function ProfessorCard({ professor }) {
  return (
    <article className="cards__card" key={professor.wizard.id}>
      <img src={professor.wizard.image} alt="professor" className="cards__img" />
      <div>
        <h2 className="cards__title">{professor.wizard.firstname} {professor.wizard.lastname}</h2>
        <p className="cards__subtitle"><span>Subject:</span> {professor.subject.name}</p>
        <p className="cards__subtitle"><span>Room:</span> {professor.room.name}</p>
      </div>
    </article>
  );
}
