"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaRoute = void 0;
const pessoaService_1 = require("../services/pessoaService");
const express_1 = __importDefault(require("express"));
class PessoaRoute {
    constructor(pessoaRepository) {
        this._pessoaRepository = pessoaRepository;
    }
    montaRotas() {
        let router = express_1.default.Router();
        router.post('/create', (request, response) => {
            let pessoaService = new pessoaService_1.PessoaService(this._pessoaRepository);
            return pessoaService.create(request, response, null);
        });
        // router.post('/login', pessoaService.login);
        // router.post('/forgot', pessoaService.forgotPassword);
        // router.post('/reset', pessoaService.newPassword);
        // router.post('/verifyLink', pessoaService.verifyEmail);
        return router;
    }
}
exports.PessoaRoute = PessoaRoute;
//# sourceMappingURL=pessoaRoute.js.map