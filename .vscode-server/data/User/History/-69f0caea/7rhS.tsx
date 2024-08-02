import { ProfessorCard } from "../components/ProfessorCard";
import { SubjectCard } from "../components/SubjetcCard";
import DataFetcher from "../hooks/Datafetcher";
import { useState } from "react";

export function Home() {
  const [view, setView] = useState(null);

  const handleShowProfessors = () => {
    setView("professors");
  };

  const handleShowSubjects = () => {
    const btn = document.querySelector(".btn ");
    setView("subjects");
    btn.toggle
  };

  return (
    <div className="home">
        <div className="buttons">
            <button onClick={handleShowProfessors} className="btn">Professeurs</button>
            <button onClick={handleShowSubjects} className="btn">Matières</button>
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
