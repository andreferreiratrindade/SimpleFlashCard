"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConteudoRoute = void 0;
const express_1 = __importDefault(require("express"));
const conteudoService_1 = require("../services/conteudoService");
class ConteudoRoute {
    constructor(conteudoRepository) {
        this._conteudoRepository = conteudoRepository;
    }
    montaRotas() {
        let router = express_1.default.Router();
        router.post("", (request, response) => {
            console.log("adicionar conteudo");
            let conteudoService = new conteudoService_1.ConteudoService(this._conteudoRepository);
            return conteudoService.adicionar(request, response);
        });
        router.get("", (request, response) => {
            console.log("listagem");
            let conteudoService = new conteudoService_1.ConteudoService(this._conteudoRepository);
            return conteudoService.listagem(request, response);
        });
        router.put("", (request, response) => {
            console.log("Atualiza");
            let cartaoService = new conteudoService_1.ConteudoService(this._conteudoRepository);
            return cartaoService.atualizar(request, response);
        });
        router.get("/:idConteudo", (request, response) => {
            console.log("RecuperaPorId");
            let cartaoService = new conteudoService_1.ConteudoService(this._conteudoRepository);
            return cartaoService.recuperaPorId(request, response);
        });
        router.delete("/:idConteudo", (request, response) => {
            console.log("RecuperaPorId");
            let cartaoService = new conteudoService_1.ConteudoService(this._conteudoRepository);
            return cartaoService.excluir(request, response);
        });
        return router;
    }
}
exports.ConteudoRoute = ConteudoRoute;
//# sourceMappingURL=conteudoRoute.js.map