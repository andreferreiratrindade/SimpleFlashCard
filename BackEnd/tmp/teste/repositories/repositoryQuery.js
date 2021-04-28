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
exports.RepositoryQuery = void 0;
const sequelize_1 = require("../instances/sequelize");
class RepositoryQuery {
    static RecuperaTodasCaixas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sequelize_1.sequelize.query(`select caixa.idCaixa, caixa.nroIncremento, caixa.desCaixa from Caixa caixa`, { type: 'SELECT' });
        });
    }
    static RecuperaAvaliacaoCaixaAtual(idCartao) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sequelize_1.sequelize.query(`select idCaixa from Avaliacao where idCartao = :idCartao order by idCartao limit 1 `, { replacements: { idCartao: idCartao }, type: 'SELECT' });
        });
    }
    static RecuperaProximaAvaliacao(idPessoa, idConteudo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sequelize_1.sequelize.query(`select pergunta.txtPergunta
            ,	resposta.txtResposta
            ,   conteudo.idPessoa
            , 	caixaAcerto.DesCaixa as desAcerto
            ,	caixaErro.DesCaixa as desErro
            ,   cartao.idCartao
            from Cartao cartao 
            inner join Conteudo conteudo
              on conteudo.idConteudo = cartao.idConteudo
            inner join Pergunta pergunta 
                on cartao.idCartao = pergunta.idCartao
            inner join Resposta resposta
                on resposta.idCartao = cartao.idCartao
            left join Avaliacao avaliacao 
              on avaliacao.IdCartao = cartao.IdCartao
              and avaliacao.idAvaliacao = (select idAvaliacao from Avaliacao where cartao.IdCartao = idCartao order by DtaProximaAvaliacao desc limit 1 )
            left join Caixa caixaAcerto 
              -- Se acertar, cartão será enviado para proxima caixa 
              on ( caixaAcerto.idCaixa = IFNULL(avaliacao.idCaixa,0) + 1)
             left join Caixa caixaErro 
              -- Se errar, cartão será enviado para primeira caixa
              on ( caixaErro.idCaixa = IFNULL(avaliacao.idCaixa,1))   
                
            where conteudo.idPessoa = :idPessoa
            and conteudo.idConteudo = :idConteudo
            and ( avaliacao.idCartao is null or avaliacao.DtaProximaAvaliacao <= now() )`, { replacements: { idPessoa: idPessoa, idConteudo: idConteudo }, type: 'SELECT' });
        });
    }
}
exports.RepositoryQuery = RepositoryQuery;
//# sourceMappingURL=repositoryQuery.js.map