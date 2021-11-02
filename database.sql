--create database
create database ECommerceDB;

--create table users
create table users (
    id serial primary key,
    user_name varchar(100),
    user_email varchar(100)
);

--create table products
create table products(
    int serial primary key,
    product_name varchar(100),
    description varchar(255),
    price money
);

-- create table orders
create table orders (
    int serial primary key,
    user_id int references users(id),
    product_id int references products(id),
    qty int,
    total money
);