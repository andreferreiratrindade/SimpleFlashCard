import { Sequelize } from 'sequelize-typescript';
import { Cartao } from '../models/cartaoModel';
import { Conteudo } from '../models/conteudoModel';
import { Pergunta } from '../models/perguntaModel';
import {  Pessoa } from '../models/pessoaModel';
import { Resposta } from '../models/respostaModel';
//https://freedb.tech/dashboard/index.php
const db = 'freedbtech_SimpleFlashCard'
const username = 'freedbtech_ifpt'
const password = 'Mudar123'

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306,
  host:"freedb.tech",
  models: [Pessoa, Conteudo, Cartao, Pergunta, Resposta],
  repositoryMode: true,
});

sequelize.authenticate()