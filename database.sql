-- CREATE DATABASE authtodo;

-- CREATE TABLE users(
--   user_id uuid DEFAULT uuid_generate_v4(),
--   user_name VARCHAR(255) NOT NULL,
--   user_email VARCHAR(255) NOT NULL UNIQUE,
--   user_password VARCHAR(255) NOT NULL,
--   PRIMARY KEY(user_id)
-- );

-- CREATE TABLE todo(
--   todo_id SERIAL,
--   user_id UUID ,
--   description VARCHAR(255),
--   PRIMARY KEY (todo_id),
--   FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );


CREATE DATABASE apartment_project;

--users

CREATE TABLE users(
  user_id SERIAL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL UNIQUE,
  created_at timestamp default current_timestamp,
  flat_no VARCHAR(255) NOT NULL,
  flat_status VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL,
  fitness BOOLEAN NOT NULL,
   swimming_pool BOOLEAN NOT NULL,
    moved_at timestamp default NULL,
  PRIMARY KEY (user_id)
);


CREATE TABLE admins(
  admin_id SERIAL,
 
  admin_email VARCHAR(255) NOT NULL UNIQUE,
  admin_password VARCHAR(255) NOT NULL,
 
  PRIMARY KEY (admin_id)
);


--todos

CREATE TABLE dues(
  due_id SERIAL ,
  user_id SERIAL,
  amount smallint,
  created_at timestamp default current_timestamp,
  is_paid BOOLEAN default false,
  description VARCHAR(255) ,
  PRIMARY KEY (due_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE rates(

 swimming_pool_fee smallint default 20,
fitness_fee smallint default 20,
 other_fee smallint default 30

);


--fake users data

insert into users (user_name, user_email, user_password) values ('Jacob', 'jacob@gmail.com', 'kthl8822');

--fake todos data

insert into rates (swimming_pool_fee,fitness_fee,other_fee) values (20,20,30);