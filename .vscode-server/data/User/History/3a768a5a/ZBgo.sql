DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS projects;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  email VARCHAR(255)
  ,
  updated_at DATETIME
);

CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  description TEXT NOT NULL,
  language TEXT NOT NULL,
  html_url TEXT NOT NULL,
  license TEXT,
  private BOOLEAN NOT NULL,
  archived BOOLEAN NOT NULL,
  owner_id INTEGER REFERENCES owners(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME
);

INSERT INTO owners (login, type, avatar_url, html_url) VALUES
("Snoop","people","https://picsum.photos/200/300","snoopydog-dogpoung.com"),
("Garfield","people","https://picsum.photos/200/300","garfield-thecat.com"),
("Scooby","people","https://picsum.photos/200/300","scooby-doo.com");

INSERT INTO projects (private, archived, name, full_name, description, language, html_url, license, owner_id) VALUES
(false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","JAVASCRIPT","https://javascript.info","MIT",1),
(false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","PHP","https://javascript.info","MIT",2),
(false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","REACT","https://javascript.info","MIT",3),
(false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","NODE","https://javascript.info","MIT",1),
(false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","LARAVEL","https://javascript.info","MIT",2);
