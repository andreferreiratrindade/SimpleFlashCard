"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const pessoaModel_1 = require("../models/pessoaModel");
const db = 'SimpleFlashCard';
const username = 'root';
const password = 'Mudar123';
exports.sequelize = new sequelize_typescript_1.Sequelize(db, username, password, {
    dialect: "mysql",
    port: 3306,
    models: [pessoaModel_1.Pessoa],
    repositoryMode: true,
});
exports.sequelize.authenticate();
//# sourceMappingURL=sequelize.js.map