CREATE TABLE User (
    IdUser INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255)
);

CREATE TABLE EspaceDeCoworking (
    IdCoworkingSpace INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Description TEXT,
    Adress VARCHAR(255)
);

CREATE TABLE Commentaire (
    IdComment INT PRIMARY KEY AUTO_INCREMENT,
    IdUser INT,
    IdEspaceDeCoworking INT,
    Contenu TEXT,
    FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur),
    FOREIGN KEY (IdEspaceDeCoworking) REFERENCES EspaceDeCoworking(IdEspaceDeCoworking)
);

CREATE TABLE Reservation (
    IdReservation INT PRIMARY KEY AUTO_INCREMENT,
    IdUtilisateur INT,
    IdEspaceDeCoworking INT,
    DateReservation DATE,
    FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur),
    FOREIGN KEY (IdEspaceDeCoworking) REFERENCES EspaceDeCoworking(IdEspaceDeCoworking)
);



-- INSERT INTO projects (private, archived, name, full_name, description, language, html_url, license, owner_id) VALUES
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","JAVASCRIPT","https://javascript.info","MIT",1),
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","PHP","https://javascript.info","MIT",2),
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","REACT","https://javascript.info","MIT",3),
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","NODE","https://javascript.info","MIT",1),
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","LARAVEL","https://javascript.info","MIT",2);
