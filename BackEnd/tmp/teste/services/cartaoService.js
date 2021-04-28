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
exports.CartaoService = void 0;
const express_validator_1 = require("express-validator");
const retornoRequest_1 = require("../utils/retornoRequest");
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const sequelize_1 = require("../instances/sequelize");
class CartaoService {
    constructor(cartaoRepository, perguntaRepository, respostaRepository) {
        this._cartaoRepository = cartaoRepository;
        this._respostaRepository = respostaRepository;
        this._perguntaRepository = perguntaRepository;
    }
    adicionarValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idConteudo")
                .notEmpty()
                .withMessage("Campo Conteudo é de preenchimento obrigatório")
                .run(req);
            yield express_validator_1.check("txtPergunta")
                .notEmpty()
                .withMessage("Campo Pergunta é de preenchimento obrigatório")
                .run(req);
            yield express_validator_1.check("txtResposta")
                .notEmpty()
                .withMessage("Campo Resposta é de preenchimento obrigatório")
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
            console.log(req.body);
            let Cartao = {
                idConteudo: req.body.idConteudo
            };
            let resultCreate = yield this._cartaoRepository.create(Cartao);
            let pergunta = {
                idCartao: resultCreate.idCartao,
                txtPergunta: req.body.txtPergunta
            };
            // Adicionar pergunta
            let resultePergunta = yield this._perguntaRepository.create(pergunta);
            let resposta = {
                idCartao: resultCreate.idCartao,
                txtResposta: req.body.txtResposta
            };
            // Adicionar Resposta
            let resulteResposta = yield this._respostaRepository.create(resposta);
            return retornoRequest_1.RetornoRequest.Response(resultCreate, null, res, HttpStatusCode_1.default.OK);
        });
    }
    listagemValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idConteudo")
                .notEmpty()
                .withMessage("Campo Conteudo é de preenchimento obrigatório")
                .isNumeric()
                .withMessage("Campo do tipo numerico")
                .run(req);
        });
    }
    listagem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.listagemValidacao(req);
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            const cartoes = yield sequelize_1.sequelize.query(`select pergunta.txtPergunta
    , resposta.txtResposta
    , cartao.idCartao
    , pergunta.idPergunta
    , resposta.idResposta
     from Cartao cartao
    inner join Pergunta pergunta
      on pergunta.IdCartao = cartao.IdCartao
    inner join resposta resposta
      on resposta.IdCartao = cartao.IdCartao
      where cartao.IdConteudo = :idConteudo `, { replacements: { idConteudo: req.query.idConteudo }, type: 'SELECT' });
            return retornoRequest_1.RetornoRequest.Response(cartoes, null, res, HttpStatusCode_1.default.OK);
        });
    }
    atualizarValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idCartao")
                .notEmpty()
                .withMessage("Campo é de preenchimento obrigatório")
                .run(req);
            yield express_validator_1.check("txtResposta")
                .notEmpty()
                .withMessage("Campo é de preenchimento obrigatório")
                .run(req);
            yield express_validator_1.check("txtPergunta")
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
            let conteudoResposta = { txtResposta: req.body.txtResposta };
            let resultUpdateResposta = yield this._respostaRepository.update(conteudoResposta, { where: { idCartao: req.body.idCartao } });
            let conteudoPergunta = { txtPergunta: req.body.txtPergunta };
            let resultUpdatePergunta = yield this._perguntaRepository.update(conteudoPergunta, { where: { idCartao: req.body.idCartao } });
            return retornoRequest_1.RetornoRequest.Response([resultUpdatePergunta, resultUpdateResposta], null, res, HttpStatusCode_1.default.OK);
        });
    }
    recuperacaPorIdValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idCartao")
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
            const cartao = yield sequelize_1.sequelize.query(`select pergunta.txtPergunta
      , resposta.txtResposta
      , cartao.idCartao
      , pergunta.idPergunta
      , resposta.idResposta
       from Cartao cartao
      inner join Pergunta pergunta
        on pergunta.IdCartao = cartao.IdCartao
      inner join resposta resposta
        on resposta.IdCartao = cartao.IdCartao
        where cartao.IdCartao = :idCartao `, { replacements: { idCartao: req.params.idCartao }, type: 'SELECT' });
            return retornoRequest_1.RetornoRequest.Response(cartao[0], null, res, HttpStatusCode_1.default.OK);
        });
    }
    excluirValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idCartao")
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
            const conteudo = yield this._cartaoRepository.destroy({ where: { idCartao: req.params.idCartao } });
            return retornoRequest_1.RetornoRequest.Response(conteudo, null, res, HttpStatusCode_1.default.OK);
        });
    }
}
exports.CartaoService = CartaoService;
//# sourceMappingURL=cartaoService.js.map