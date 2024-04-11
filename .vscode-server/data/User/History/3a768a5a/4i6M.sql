DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS projects;

CREATE TABLE owners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  login TEXT,
  type TEXT,
  avatar_url TEXT,
  html_url TEXT
  created_at DATETIME
);

CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  full_name TEXT,
  description TEXT,
  language TEXT,
  html_url TEXT,
  license TEXT,
  private INTEGER,
  archived INTEGER,
  owner_id INTEGER
);

INSERT INTO owners (login, type, avatar_url, html_url) VALUES
("Snoop","people","https://picsum.photos/200/300","snoopydog-dogpoung.com"),
("Garfield","people","https://picsum.photos/200/300","garfield-thecat.com"),
("Scooby","people","https://picsum.photos/200/300","scooby-doo.com");

INSERT INTO projects (private, archived, name, full_name, description, language, html_url, license, owner_id) VALUES
(0,0,"nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","JAVASCRIPT","https://javascript.info","MIT",1),
(0,0,"nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","PHP","https://javascript.info","MIT",2),
(0,0,"nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","REACT","https://javascript.info","MIT",3),
(0,0,"nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","NODE","https://javascript.info","MIT",1),
(0,0,"nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","LARAVEL","https://javascript.info","MIT",2);
