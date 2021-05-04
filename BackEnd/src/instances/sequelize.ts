import { Sequelize } from 'sequelize-typescript';
import { Config } from '../config/Config';
import { Avaliacao } from '../models/avaliacaoModel';
import { Cartao } from '../models/cartaoModel';
import { Conteudo } from '../models/conteudoModel';
import { Pergunta } from '../models/perguntaModel';
import {  Pessoa } from '../models/pessoaModel';
import { Resposta } from '../models/respostaModel';
const dataBaseInfo = Config.databaseInfo();

console.log(dataBaseInfo);
export const sequelize = new Sequelize(dataBaseInfo.db, dataBaseInfo.username, dataBaseInfo.password, {
  dialect: "mysql",
  port: dataBaseInfo.port,
  host:dataBaseInfo.host,
  models: [Pessoa, Conteudo, Cartao, Pergunta, Resposta, Avaliacao],
  repositoryMode: true,
  logging:  dataBaseInfo.logging 
});

sequelize.authenticate()