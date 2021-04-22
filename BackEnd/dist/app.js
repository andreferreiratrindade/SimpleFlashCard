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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config = __importStar(require("./config/config.json"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const pessoaRoute_1 = require("./routes/pessoaRoute");
const tokenService_1 = require("./services/tokenService");
const sequelize_1 = require("./instances/sequelize");
const pessoaModel_1 = require("./models/pessoaModel");
const app = express_1.default();
const apiRoutes = express_1.default.Router();
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(morgan_1.default('dev'));
// middleware
apiRoutes.use(tokenService_1.TokenService.validaToken);
let pessoaRepository = sequelize_1.sequelize.getRepository(pessoaModel_1.Pessoa);
let pessoaRoute = new pessoaRoute_1.PessoaRoute(pessoaRepository);
// public
app.use('/pessoa', pessoaRoute.montaRotas());
app.use('/api', apiRoutes);
var port = config.server.port;
app.listen(process.env.PORT || port);
console.log('App started on port ' + port);
//# sourceMappingURL=app.js.map