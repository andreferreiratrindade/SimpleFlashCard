"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetornoRequest = void 0;
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
class RetornoRequest {
    static Response(result, error, res, statusCode) {
        res.status(statusCode);
        var retorno = {
            obj: result,
            ok: res.statusCode == HttpStatusCode_1.default.OK,
            error: error
        };
        return res.json(retorno);
    }
}
exports.RetornoRequest = RetornoRequest;
//# sourceMappingURL=retornoRequest.js.map