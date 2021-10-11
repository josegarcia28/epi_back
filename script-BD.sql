CREATE DATABASE IF NOT EXISTS azurian_prueba;
USE azurian_prueba;

CREATE TABLE users(
    id          int(255) auto_increment not null,
    nombre      varchar(50) not null,
	edad		int(3),
    username    varchar(150),
    
    CONSTRAINT pk_users PRIMARY KEY(id)
)ENGINE=InnoDb;