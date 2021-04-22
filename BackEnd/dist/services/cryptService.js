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
exports.CryptService = void 0;
const crypto = __importStar(require("crypto"));
class CryptService {
    /**
     *
     * @param password
     */
    static decrypt(password) {
        let crypted = new Crypto;
        let decipher = crypto.createDecipheriv(this.algorithm, this.privateKey, null);
        let dec = decipher.update(password, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    static encrypt(password) {
        var cipher = crypto.createCipheriv(this.algorithm, this.privateKey, null);
        var crypted = cipher.update(password, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
}
exports.CryptService = CryptService;
CryptService.algorithm = 'aes-256-ctr';
CryptService.privateKey = '37LvDSm4XvjYOh9Y';
//# sourceMappingURL=cryptService.js.map