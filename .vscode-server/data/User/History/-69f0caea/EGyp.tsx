import React, { useState, useEffect } from "react";
import { ProfessorCard } from "../components/ProfessorCard";
import { SubjectCard } from "../components/SubjectCard";
import DataFetcher from "../hooks/DataFetcher";

interface Professor {
  wizard: {
    id: number;
    firstname: string;
    lastname: string;
    image: string;
  };
  subject: {
    name: string;
  };
  room: {
    name: string;
  };
}

interface Subject {
  id: number;
  name: string;
  description: string;
  image: string;
}

export function Home() {
  const [view, setView] = useState<string>("professors");

  useEffect(() => {
    handleShowProfessors();
  }, []);

  const handleShowProfessors = () => {
    setView("professors");
    const buttonProfessor = document.getElementById("btn-professor");
    const buttonSubject = document.getElementById("btn-subject");
    if (buttonProfessor && buttonSubject) {
      buttonProfessor.classList.add("btn-active");
      buttonSubject.classList.remove("btn-active");
    }
  };

  const handleShowSubjects = () => {
    setView("subjects");
    const buttonProfessor = document.getElementById("btn-professor");
    const buttonSubject = document.getElementById("btn-subject");
    if (buttonProfessor && buttonSubject) {
      buttonProfessor.classList.remove("btn-active");
      buttonSubject.classList.add("btn-active");
    }
  };

  return (
    <div className="home">
      <div className="buttons">
        <button
          id="btn-professor"
          onClick={handleShowProfessors}
          className={`btn ${view === "professors" ? "btn-active" : ""}`}
        >
          Professeurs
        </button>
        <button
          id="btn-subject"
          onClick={handleShowSubjects}
          className={`btn ${view === "subjects" ? "btn-active" : ""}`}
        >
          Matières
        </button>
      </div>
      {view === "professors" && (
        <DataFetcher url="http://localhost:3000/staff">
          {(data: Professor[]) => (
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
          {(data: Subject[]) => (
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