"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartaoRoute = void 0;
const express_1 = __importDefault(require("express"));
const cartaoService_1 = require("../services/cartaoService");
class CartaoRoute {
    constructor(cartaoRepository, perguntaRepository, respostaRepository) {
        this._cartaoRepository = cartaoRepository;
        this._respostaRepository = respostaRepository;
        this._perguntaRepository = perguntaRepository;
    }
    montaRotas() {
        let router = express_1.default.Router();
        router.post("", (request, response) => {
            console.log("adicionar cartao");
            let cartaoService = new cartaoService_1.CartaoService(this._cartaoRepository, this._perguntaRepository, this._respostaRepository);
            return cartaoService.adicionar(request, response);
        });
        router.get("", (request, response) => {
            console.log("listagem cartao");
            let cartaoService = new cartaoService_1.CartaoService(this._cartaoRepository, this._perguntaRepository, this._respostaRepository);
            return cartaoService.listagem(request, response);
        });
        router.put("", (request, response) => {
            console.log("Atualiza");
            let cartaoService = new cartaoService_1.CartaoService(this._cartaoRepository, this._perguntaRepository, this._respostaRepository);
            return cartaoService.atualizar(request, response);
        });
        router.get("/:idCartao", (request, response) => {
            console.log("RecuperaPorId");
            let cartaoService = new cartaoService_1.CartaoService(this._cartaoRepository, this._perguntaRepository, this._respostaRepository);
            return cartaoService.recuperaPorId(request, response);
        });
        router.delete("/:idCartao", (request, response) => {
            console.log("Excluir");
            let cartaoService = new cartaoService_1.CartaoService(this._cartaoRepository, this._perguntaRepository, this._respostaRepository);
            return cartaoService.excluir(request, response);
        });
        return router;
    }
}
exports.CartaoRoute = CartaoRoute;
//# sourceMappingURL=cartaoRoute.js.map