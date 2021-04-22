create database SimpleFlashCard;

use SimpleFlashCard;

create table if not exists Pessoa(
	IdPessoa	int auto_increment primary key,
	NmePessoa varchar(500) not null, 
    TxtSenha varchar(500) not null,
    TxtEmail varchar(500) not null,
    DtaIncusao TIMESTAMP  default current_timestamp
)