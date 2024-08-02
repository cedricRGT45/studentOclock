
export function ProfessorCard({ professor }) {
  return (
    <article className="cards__card" key={professor.wizard.id}>
      <img src={professor.wizard.image} alt="professor" className="cards__card-img" />
      <div className="cards__card-bg">
        <p className="cards__card-title">{professor.wizard.firstname} {professor.wizard.lastname}</p>
        <p className="cards__card-subtitle">Subject: {professor.subject.name}</p>
        <p className="cards__card-subtitle">Room: {professor.room.name}</p>
      </div>
    </article>
  );
}
