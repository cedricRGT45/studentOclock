SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Create the user oclock with password
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'oclock') THEN
      CREATE ROLE oclock WITH LOGIN PASSWORD 'passw0rd';
   END IF;
END
$$;

CREATE SCHEMA IF NOT EXISTS shop;
ALTER SCHEMA shop OWNER TO oclock;

SET default_tablespace = '';
SET default_table_access_method = heap;
SET schema 'shop';

DROP TABLE IF EXISTS shop.product;
DROP SEQUENCE IF EXISTS shop.product_id_seq;
CREATE SEQUENCE shop.product_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE shop.product (
    id integer DEFAULT nextval('shop.product_id_seq') NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    title character varying(255) NOT NULL,
    description text,
    price integer NOT NULL,
    rating integer,
    stock integer DEFAULT 100 NOT NULL,
    category character varying(255) NOT NULL,
    images json DEFAULT '["https://images.unsplash.com/photo-1559703248-dcaaec9fab78","https://images.unsplash.com/photo-1459411552884-841db9b3cc2a"]'
);

ALTER TABLE shop.product OWNER TO oclock;

DROP TABLE IF EXISTS shop.user;
DROP SEQUENCE IF EXISTS shop.user_id_seq;
CREATE SEQUENCE shop.user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE shop.user (
    id integer DEFAULT nextval('shop.user_id_seq') NOT NULL,
    firstName character varying(255) NOT NULL,
    lastName character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    address text NOT NULL
);

ALTER TABLE shop.user OWNER TO oclock;

DROP TABLE IF EXISTS shop.pivot_cart_product;
DROP SEQUENCE IF EXISTS shop.pcp_id_seq;
CREATE SEQUENCE shop.pcp_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE shop.pivot_cart_product (
    id integer DEFAULT nextval('shop.pcp_id_seq') NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);

ALTER TABLE shop.pivot_cart_product OWNER TO oclock;

DROP TABLE IF EXISTS shop.cart;
DROP SEQUENCE IF EXISTS shop.cart_id_seq;
CREATE SEQUENCE shop.cart_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE shop.cart (
    id integer DEFAULT nextval('shop.cart_id_seq') NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL
);

ALTER TABLE shop.cart OWNER TO oclock;

-- DATA
INSERT INTO shop.product (title, description, price, category) VALUES
('T-shirt', 'Trop beau', 20, 'Vêtements'),
('Sapiens', 'Yuval Noah Harari', 12, 'Livres'),
('Pantalon', 'Trop beau', 30, 'Vêtements'),
('Encre imprimante', 'Noir', 10, 'Fournitures'),
('La vie secrète des arbres', 'Peter Wohlleben', 12, 'Livres'),
('Toner imprimante', 'HP', 40, 'Fournitures'),
('Stylo', 'Bic', 1, 'Fournitures'),
('Cahier', '100 pages', 3, 'Fournitures'),
('Chemise', 'Trop belle', 50, 'Vêtements'),
('La sobriété heureuse', 'Pierre Rabi', 12, 'Livres'),
('Papier imprimante', '250g/m²', 5, 'Fournitures'),
('Le lambeau', 'Philippe Lançon', 12, 'Livres');

INSERT INTO shop.user (firstname, lastname, email, password, phone, address) VALUES 
('John', 'Doe', 'john@doe.fr', '1234', '0123456789', '1 rue de la paix'),
('Jane', 'Doe', 'jane@doe.fr', '1234', '0123456789', '2 rue de la paix'),
('Jean', 'Dupont', 'jean@dupont.fr', '1234', '0123456789', '7 rue de la paix');

INSERT INTO shop.cart (user_id) VALUES 
(1),
(2),
(3);

INSERT INTO shop.pivot_cart_product (cart_id, product_id, quantity) VALUES 
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(2, 4, 1),
(2, 5, 1),
(2, 6, 1),
(3, 7, 1),
(3, 8, 1),
(3, 9, 1),
(3, 10, 1),
(3, 11, 1),
(3, 12, 1);
