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
const Config = __importStar(require("../config/config.json"));
const express_validator_1 = require("express-validator");
const privateKey = Config.key.privateKey;
class PessoaController {
    createValidation(req) {
        express_validator_1.check("email").notEmpty().run(req);
        const result = express_validator_1.validationResult(req);
        if (!result.isEmpty()) {
        }
    }
    create(req, res, next) {
        console.log("create");
        console.log(req.body);
        this.createValidation(req);
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