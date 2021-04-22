create database SimpleFlashCard;

use SimpleFlashCard;

create table if not exists Pessoa(
	IdPessoa	int auto_increment primary key,
	NmePessoa varchar(500) not null, 
    TxtSenha varchar(500) not null,
    TxtEmail varchar(500) not null,
    DtaIncusao TIMESTAMP  default current_timestamp
);

create table if not exists Conteudo(
	IdConteudo	int auto_increment primary key,
	IdPessoa int not null, 
    NmeConteudo varchar(500) not null,
    DtaIncusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdPessoa)
        REFERENCES Pessoa (IdPessoa)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

create table if not exists Cartao(
    IdCartao int auto_increment primary key, 
    IdConteudo int not null, 
    DtaIncusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdConteudo)
    REFERENCES Conteudo (IdConteudo)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table if not exists CartaoPergunta(
    IdCartaoPergunta int auto_increment primary key, 
    IdCartao int not null, 
    TxtPergunta  Text  not null, 
    DtaIncusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdCartao)
    REFERENCES Cartao (IdCartao)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table if not exists CartaoResposta(
    IdCartaoResposta int auto_increment primary key, 
    IdCartao int not null, 
    TxtResposta  Text  not null, 
    DtaIncusao TIMESTAMP  default current_timestamp,
    FOREIGN KEY (IdCartao)
    REFERENCES Cartao (IdCartao)
    ON UPDATE RESTRICT ON DELETE CASCADE
);