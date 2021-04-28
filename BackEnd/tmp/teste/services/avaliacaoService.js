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
exports.AvaliacaoService = void 0;
const express_validator_1 = require("express-validator");
const retornoRequest_1 = require("../utils/retornoRequest");
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const repositoryQuery_1 = require("../repositories/repositoryQuery");
const Constants_1 = require("../constants/Constants");
class AvaliacaoService {
    constructor(AvaliacaoRepository) {
        this._avaliacaoRepository = AvaliacaoRepository;
    }
    adicionarValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idCartao")
                .notEmpty()
                .withMessage("Campo é de preenchimento obrigatório")
                .isNumeric()
                .withMessage("Campo é do tipo númerico")
                .run(req);
            yield express_validator_1.check("idTipoAvaliacao")
                .notEmpty()
                .withMessage("Campo é de preenchimento obrigatório")
                .isNumeric()
                .withMessage("Campo é do tipo númerico")
                .custom((value) => {
                let tiposValidos = [Constants_1.Constants.TipoAtendimetno.ERREI, Constants_1.Constants.TipoAtendimetno.ACERTEI];
                return tiposValidos.filter(x => { return x == value; });
            })
                .withMessage("Campo permite apenas os valores 1 para Acertei ou 2 para Errei")
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
            // recupera caixas 
            let caixas = yield repositoryQuery_1.RepositoryQuery.RecuperaTodasCaixas();
            let caixaUltimaAvaliacao = yield repositoryQuery_1.RepositoryQuery.RecuperaAvaliacaoCaixaAtual(req.body.idCartao);
            let idCaixa = 1;
            console.log(caixaUltimaAvaliacao);
            // Caso o tipo de avaliacação seja ACERTEI e existe avaliação anterior
            if (req.body.idTipoAvaliacao == Constants_1.Constants.TipoAtendimetno.ACERTEI
                && caixaUltimaAvaliacao.length > 0) {
                const idCaixaAtual = caixaUltimaAvaliacao[0];
                idCaixa = idCaixaAtual.idCaixa + 1;
            }
            // Recupera caixa de acordo com o tipo de avaliação selecionada
            let caixa = caixas.filter((x) => { return x.idCaixa == idCaixa; })[0];
            var currentDate = new Date();
            var futureDate = new Date(currentDate.getTime() + caixa.nroIncremento * 60000);
            let Avaliacao = {
                idCartao: req.body.idCartao,
                idTipoAvaliacao: req.body.idTipoAvaliacao,
                idCaixa: caixa.idCaixa,
                dtaProximaAvaliacao: futureDate
            };
            let resultCreate = yield this._avaliacaoRepository.create(Avaliacao);
            return retornoRequest_1.RetornoRequest.Response(resultCreate, null, res, HttpStatusCode_1.default.OK);
        });
    }
    recuperaProximaAvaliacaoValidacao(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("idConteudo")
                .notEmpty()
                .withMessage("Campo é de preenchimento obrigatório")
                .run(req);
        });
    }
    recuperaProximaAvaliacao(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recuperaProximaAvaliacaoValidacao(req);
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            let idPessoa = req.decoded.idPessoa;
            const avaliacao = yield repositoryQuery_1.RepositoryQuery.RecuperaProximaAvaliacao(idPessoa, parseInt(req.params.idConteudo));
            return retornoRequest_1.RetornoRequest.Response(avaliacao[0], null, res, HttpStatusCode_1.default.OK);
        });
    }
}
exports.AvaliacaoService = AvaliacaoService;
//# sourceMappingURL=avaliacaoService.js.map