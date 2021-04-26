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


create table if not exists Pergunta(
    IdPergunta int auto_increment primary key, 
    IdCartao int not null, 
    TxtPergunta  Text  not null, 
    DtaIncusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdCartao)
    REFERENCES Cartao (IdCartao)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table if not exists Resposta(
    IdResposta int auto_increment primary key, 
    IdCartao int not null, 
    TxtResposta  Text  not null, 
    DtaIncusao TIMESTAMP  default current_timestamp,
    FOREIGN KEY (IdCartao)
    REFERENCES Cartao (IdCartao)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table if not exists Caixa(
    IdCaixa tinyint  primary key, 
    NroIncremento int not null, 
    DesCaixa varchar(50) not null
);


create table if not exists TipoAvaliacao(
    idTipoAvaliacao tinyint primary key, 
    DesTipoAvaliacao varchar(50)

);


create table if not exists Avaliacao(

    IdAvaliacao int auto_increment primary key, 
    IdCartao int not null, 
    IdCaixa tinyint not null, 
    idTipoAvaliacao tinyint not null, 
    DtaProximaAvaliacao TIMESTAMP not null,
    DtaIncusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdCaixa)
    REFERENCES Caixa (IdCaixa)
    ON UPDATE RESTRICT ON DELETE CASCADE,

    
    FOREIGN KEY (IdCartao)
    REFERENCES Cartao (IdCartao)
    ON UPDATE RESTRICT ON DELETE CASCADE,

    FOREIGN KEY (idTipoAvaliacao)
    REFERENCES TipoAvaliacao (idTipoAvaliacao)
    ON UPDATE RESTRICT ON DELETE CASCADE
);


insert into Caixa values(1,5,'5 minutos');
insert into Caixa values(2,1440,'1 dia');
insert into Caixa values(4,2880,'2 dias');
insert into Caixa values(5,7200,'5 dias');
insert into Caixa values(6,11520,'8 dias');
insert into Caixa values(7,18720,'13 dias');
insert into Caixa values(8,30240,'21 dias');
insert into Caixa values(9,48960,'1 mês');
insert into Caixa values(9,79200,'2 mêses');
insert into Caixa values(10,128160,'3 mêses');


insert into TipoAvaliacao values(1, 'Acertou');
insert into TipoAvaliacao values(2, 'Errou');
