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
 
INSERT INTO products (product_name,department_name,price, stockl_quantity) 
VALUES (

)