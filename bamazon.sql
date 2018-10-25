CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30),
department_name VARCHAR(30),
price DECIMAL(7,2),
stock_quantity INTEGER,
PRIMARY KEY(id) 
);

 ALTER TABLE products AUTO_INCREMENT = 1365;
 
INSERT INTO products (product_name,department_name,price, stock_quantity) 
VALUES 
('black hat', 'clothing', 10, 15),
('laptop', 'electronics', 500, 3),
('red chair', 'funirature', 200, 2),
('ps4', 'electronics', 299, 12),
('xbox one', 'electronics', 299, 8),
('blue shirt', 'clothing', 15, 4),
('dish set', 'housewares', 30,2),
('galaxy 9', 'electronics', 999, 3),
('bed sheets', 'domestics', 80, 2),
('keyboard', 'electronics', 20, 5);

