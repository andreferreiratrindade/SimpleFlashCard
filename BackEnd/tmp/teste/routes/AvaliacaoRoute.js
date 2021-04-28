"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliacaoRoute = void 0;
const avaliacaoService_1 = require("../services/avaliacaoService");
const express_1 = __importDefault(require("express"));
class AvaliacaoRoute {
    constructor(avaliacaoRepository) {
        this._avaliacaoRepository = avaliacaoRepository;
    }
    montaRotas() {
        let router = express_1.default.Router();
        router.post("", (request, response) => {
            console.log("adicionar Avaliação");
            let avaliacaoService = new avaliacaoService_1.AvaliacaoService(this._avaliacaoRepository);
            return avaliacaoService.adicionar(request, response);
        });
        router.get("/RecuperarProximaAvaliacao/:idConteudo", (request, response) => {
            console.log("RecuperarProximaAvaliacao");
            let avaliacaoService = new avaliacaoService_1.AvaliacaoService(this._avaliacaoRepository);
            return avaliacaoService.recuperaProximaAvaliacao(request, response);
        });
        return router;
    }
}
exports.AvaliacaoRoute = AvaliacaoRoute;
//# sourceMappingURL=AvaliacaoRoute.js.map