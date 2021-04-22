import { Sequelize } from 'sequelize-typescript';
import { Pessoa } from '../models/pessoaModel';

const db = 'SimpleFlashCard'
const username = 'root'
const password = 'Mudar123'

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306,
  models: [Pessoa],
  repositoryMode: true,
});

sequelize.authenticate()