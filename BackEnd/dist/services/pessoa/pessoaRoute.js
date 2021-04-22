"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaRoute = void 0;
const pessoaController_1 = require("./pessoaController");
const express_1 = __importDefault(require("express"));
class PessoaRoute {
    montaRotas() {
        let router = express_1.default.Router();
        let pessoaController = new pessoaController_1.PessoaController();
        router.post('/create', pessoaController.create);
        router.post('/login', pessoaController.login);
        router.post('/forgot', pessoaController.forgotPassword);
        router.post('/reset', pessoaController.newPassword);
        router.post('/verifyLink', pessoaController.verifyEmail);
        return router;
    }
}
exports.PessoaRoute = PessoaRoute;
//# sourceMappingURL=pessoaRoute.js.map