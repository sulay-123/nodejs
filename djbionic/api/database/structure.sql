SET GLOBAL event_scheduler = ON; 

create table users(
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(150) NOT NULL,
   last_name VARCHAR(150),
   email VARCHAR(150) NOT NULL,
   password VARCHAR(150) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
   PRIMARY KEY ( id )
);