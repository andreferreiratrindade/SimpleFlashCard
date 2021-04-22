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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaController = void 0;
const Config = __importStar(require("../../config/config.json"));
const cryptService_1 = require("../crypt/cryptService");
const privateKey = Config.key.privateKey;
class PessoaController {
    create(req, res, next) {
        console.log("create");
        console.log(req.body);
        req.body.password = cryptService_1.CryptService.encrypt(req.body.password);
        var result = {};
        var error = {};
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
exports.PessoaController = PessoaController;
//# sourceMappingURL=pessoaController.js.map