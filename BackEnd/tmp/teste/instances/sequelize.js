"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const avaliacaoModel_1 = require("../models/avaliacaoModel");
const cartaoModel_1 = require("../models/cartaoModel");
const conteudoModel_1 = require("../models/conteudoModel");
const perguntaModel_1 = require("../models/perguntaModel");
const pessoaModel_1 = require("../models/pessoaModel");
const respostaModel_1 = require("../models/respostaModel");
//https://freedb.tech/dashboard/index.php
// const db = 'freedbtech_SimpleFlashCard'
// const username = 'freedbtech_ifpt'
// const password = 'Mudar123'
const db = 'SimpleFlashCard';
const username = 'root';
const password = 'Mudar123';
exports.sequelize = new sequelize_typescript_1.Sequelize(db, username, password, {
    dialect: "mysql",
    port: 3306,
    models: [pessoaModel_1.Pessoa, conteudoModel_1.Conteudo, cartaoModel_1.Cartao, perguntaModel_1.Pergunta, respostaModel_1.Resposta, avaliacaoModel_1.Avaliacao],
    repositoryMode: true,
});
exports.sequelize.authenticate();
//# sourceMappingURL=sequelize.js.map