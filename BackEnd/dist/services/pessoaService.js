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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaService = void 0;
const express_validator_1 = require("express-validator");
class PessoaService {
    constructor(pessoaRepository) {
        this._pessoaRepository = pessoaRepository;
    }
    createValidation(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("txtEmail")
                .notEmpty()
                .withMessage("Campo E-mail é de preenchimento obrigatório")
                .run(req);
            yield express_validator_1.check("txtSenha")
                .notEmpty()
                .withMessage("Campo senha é de preenchimento obrigatório")
                .run(req);
            yield express_validator_1.check("nmePessoa")
                .notEmpty()
                .withMessage("Campo Nome é de preenchimento obrigatório")
                .run(req);
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("create");
            console.log(req.body);
            yield this.createValidation(req);
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            let pessoa = Object.assign({}, req.body);
            console.log("Salvando");
            this._pessoaRepository.create(pessoa).then(x => {
                console.log(x);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    login(req, res, next) {
        console.log("login");
        var result = {};
        var error = {};
    }
    forgotPassword(req, res) {
        console.log("forgotPassword");
    }
    newPassword(req, res) {
        console.log("newPassword");
    }
    verifyEmail(req, res) {
        console.log("verifyEmail");
    }
}
exports.PessoaService = PessoaService;
//# sourceMappingURL=pessoaService.js.map