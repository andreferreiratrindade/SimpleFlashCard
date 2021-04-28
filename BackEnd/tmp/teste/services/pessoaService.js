"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.PessoaService = void 0;
const Config = __importStar(require("../config/config.json"));
const Jwt = __importStar(require("jsonwebtoken"));
const cryptService_1 = require("./cryptService");
const express_validator_1 = require("express-validator");
const retornoRequest_1 = require("../utils/retornoRequest");
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("create");
            console.log(req.body);
            yield this.createValidation(req);
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            let pessoa = {
                txtEmail: req.body.txtEmail,
                nmePessoa: req.body.nmePessoa,
                txtSenha: yield cryptService_1.CryptService.encrypt(req.body.txtSenha),
            };
            console.log("Salvando");
            let resultCreate = yield this._pessoaRepository.create(pessoa, { isNewRecord: true });
            resultCreate.txtSenha = "";
            return retornoRequest_1.RetornoRequest.Response(resultCreate, null, res, HttpStatusCode_1.default.OK);
        });
    }
    loginValidation(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("txtEmail")
                .notEmpty()
                .withMessage("Campo E-mail é de preenchimento obrigatório")
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                let pessoa = { txtEmail: value };
                const u = yield this._pessoaRepository.findOne({ where: pessoa });
                return !!u;
            }))
                .withMessage('E-mail ou senha inválidos')
                .run(req);
            yield express_validator_1.check("txtSenha")
                .notEmpty()
                .withMessage("Campo senha é de preenchimento obrigatório")
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                let pessoa = { txtEmail: req.body.txtEmail };
                const u = yield this._pessoaRepository.findOne({ where: pessoa });
                return cryptService_1.CryptService.compare(req.body.txtSenha, req.body.txtSenha);
            }))
                .withMessage('E-mail ou senha inválidos')
                .run(req);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("login");
            this.loginValidation(req);
            const resultValidate = express_validator_1.validationResult(req);
            if (!resultValidate.isEmpty()) {
                return retornoRequest_1.RetornoRequest.Response(null, resultValidate.array(), res, HttpStatusCode_1.default.BAD_REQUEST);
            }
            let pessoa = { txtEmail: req.body.txtEmail };
            const u = yield this._pessoaRepository.findOne({ where: pessoa });
            var tokenData = {
                nmePessoa: u === null || u === void 0 ? void 0 : u.nmePessoa,
                txtEmail: u === null || u === void 0 ? void 0 : u.txtEmail,
                idPessoa: u === null || u === void 0 ? void 0 : u.idPessoa,
            };
            let result = {
                pessoa: tokenData,
                token: Jwt.sign(tokenData, Config.key.privateKey, { expiresIn: Config.key.tokenExpiry }),
            };
            return retornoRequest_1.RetornoRequest.Response(result, null, res, HttpStatusCode_1.default.OK);
        });
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