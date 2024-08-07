import { ProfessorCard } from "../components/ProfessorCard";
import { SubjectCard } from "../components/SubjetCard";
import DataFetcher from "../hooks/Datafetcher";
import { useState } from "react";

export function Home() {
  const [view, setView] = useState(null);
  const button = document.querySelector(".btn ");

  const handleShowProfessors = () => {
    setView("professors");
    button.classList.toggle(".btn-active");
  };

  const handleShowSubjects = () => {
    setView("subjects");
    button.classList.toggle(".btn-active")
  };

  return (
    <div className="home">
        <div className="buttons">
            <button onClick={handleShowProfessors} id="btn-professor" className="btn">Professeurs</button>
            <button onClick={handleShowSubjects} id="btn-subjects" className="btn">Matières</button>
        </div>
        {view === "professors" && (
            <DataFetcher url="http://localhost:3000/staff">
            {(data) => (
                <div className="cards">
                {data.map((professor) => (
                    <ProfessorCard key={professor.wizard.id} professor={professor} />
                ))}
                </div>
            )}
            </DataFetcher>
        )}

        {view === "subjects" && (
            <DataFetcher url="http://localhost:3000/subjects">
            {(data) => (
                <div className="cards">
                {data.map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                ))}
                </div>
            )}
            </DataFetcher>
        )}
    </div>
  );
}
