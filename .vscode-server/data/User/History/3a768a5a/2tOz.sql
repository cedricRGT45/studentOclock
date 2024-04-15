DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS projects;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE comment (
  idComment INTEGER PRIMARY KEY AUTOINCREMENT,
  comment text
);




-- INSERT INTO projects (private, archived, name, full_name, description, language, html_url, license, owner_id) VALUES
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","JAVASCRIPT","https://javascript.info","MIT",1),
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","PHP","https://javascript.info","MIT",2),
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","REACT","https://javascript.info","MIT",3),
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","NODE","https://javascript.info","MIT",1),
-- (false, false, "nice project", "A very nice project", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, iure a. Recusandae nisi natus excepturi veritatis illum in ut consequuntur voluptatum, possimus ipsum impedit perferendis libero illo, error ex? Incidunt.","LARAVEL","https://javascript.info","MIT",2);
