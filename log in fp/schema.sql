CREATE TABLE Users (
    id int primary key auto_increment,
    fullname varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
);

INSERT INTO Users (fullname, email, username, password)
VALUES ("Saul Wade", "saulwade29@gmail.com", "saulwade29", "771270sw");

