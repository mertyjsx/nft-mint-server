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
  date_info timestamp default current_timestamp,
  flat_no VARCHAR(255) NOT NULL,
  flat_status VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL,
 fitness BOOLEAN NOT NULL,
 swimming_pool BOOLEAN NOT NULL,
  PRIMARY KEY (user_id)
);

--todos

CREATE TABLE dues(
  due_id SERIAL ,
  user_id UUID,
  amount smallint,
  description VARCHAR(255) ,
  PRIMARY KEY (due_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--fake users data

insert into users (user_name, user_email, user_password) values ('Jacob', 'jacob@gmail.com', 'kthl8822');

--fake todos data

insert into todos (user_id, description) values ('60dc16dd-c7f1-4fde-827a-90c0e101555c', 'clean room');