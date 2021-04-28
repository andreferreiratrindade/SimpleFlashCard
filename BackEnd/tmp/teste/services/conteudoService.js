"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConteudoService = void 0;
const sequelize_1 = require("../instances/sequelize");
const express_validator_1 = require("express-validator");
const retornoRequest_1 = require("../utils/retornoRequest");
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
class ConteudoService {
    constructor(conteudoRepository) {
        this._conteudoRepository = conteudoRepository;
    }
    adicionarValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("nmeConteudo")
                .notEmpty()
                .withMessage("Campo Conteudo é de preenchimento obrigatório")
                .run(req);
        });
    }
    adicionar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adicionarValidacao(req);
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            let conteudo = {
                nmeConteudo: req.body.nmeConteudo,
                idPessoa: req.decoded.idPessoa
            };
            let resultCreate = yield this._conteudoRepository.create(conteudo);
            return retornoRequest_1.RetornoRequest.Response(resultCreate, null, res, HttpStatusCode_1.default.OK);
        });
    }
    listagem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartoes = yield sequelize_1.sequelize.query(`select conteudo.idConteudo, 
            conteudo.nmeConteudo,
            (select count(idCartao) from cartao where idConteudo =  conteudo.idConteudo   ) as qtdCartao
       from Conteudo conteudo

      where conteudo.IdPessoa = :idPessoa `, { replacements: { idPessoa: req.decoded.idPessoa }, type: 'SELECT' });
            return retornoRequest_1.RetornoRequest.Response(cartoes, null, res, HttpStatusCode_1.default.OK);
        });
    }
    atualizarValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idConteudo")
                .notEmpty()
                .withMessage("Campo é de preenchimento obrigatório")
                .isNumeric()
                .withMessage("Campo deverá ser do tipo numerico")
                .run(req);
            yield express_validator_1.check("nmeConteudo")
                .notEmpty()
                .withMessage("Campo é de preenchimento obrigatório")
                .run(req);
        });
    }
    atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.atualizarValidacao(req);
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            let conteudo = { nmeConteudo: req.body.nmeConteudo };
            let resultUpdate = yield this._conteudoRepository.update(conteudo, { where: { idConteudo: req.body.idConteudo } });
            return retornoRequest_1.RetornoRequest.Response(resultUpdate, null, res, HttpStatusCode_1.default.OK);
        });
    }
    recuperacaPorIdValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idConteudo")
                .notEmpty()
                .withMessage("Campo é de preenchimento obrigatório")
                .isNumeric()
                .withMessage("Campo deverá ser do tipo numerico")
                .run(req);
        });
    }
    recuperaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recuperacaPorIdValidacao(req);
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            const conteudo = yield this._conteudoRepository.findOne({ where: { idConteudo: req.params.idConteudo } });
            return retornoRequest_1.RetornoRequest.Response(conteudo, null, res, HttpStatusCode_1.default.OK);
        });
    }
    excluirValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idConteudo")
                .notEmpty()
                .withMessage("Campo é de preenchimento obrigatório")
                .isNumeric()
                .withMessage("Campo deverá ser do tipo numerico")
                .run(req);
        });
    }
    excluir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recuperacaPorIdValidacao(req);
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            const conteudo = yield this._conteudoRepository.destroy({ where: { idConteudo: req.params.idConteudo } });
            return retornoRequest_1.RetornoRequest.Response(conteudo, null, res, HttpStatusCode_1.default.OK);
        });
    }
}
exports.ConteudoService = ConteudoService;
//# sourceMappingURL=conteudoService.js.map