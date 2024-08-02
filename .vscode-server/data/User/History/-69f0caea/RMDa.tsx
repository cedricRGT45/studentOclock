import React, { useState } from "react";
import { ProfessorCard } from "../components/ProfessorCard";
import { SubjectCard } from "../components/SubjectCard";
import DataFetcher from "../hooks/DataFetcher";

export function Home() {
  const [view, setView] = useState(null);

  const handleShowProfessors = () => {
    setView("professors");
  };

  const handleShowSubjects = () => {
    setView("subjects");
  };

  return (
    <div className="home">
      <div className="buttons">
        <button
          onClick={handleShowProfessors}
          className={`btn ${view === "professors" ? "btn-active" : ""}`}
        >
          Professeurs
        </button>
        <button
          onClick={handleShowSubjects}
          className={`btn ${view === "subjects" ? "btn-active" : ""}`}
        >
          Matières
        </button>
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

export default Home;
