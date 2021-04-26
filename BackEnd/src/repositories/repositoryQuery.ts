import { sequelize } from "../instances/sequelize";

export class RepositoryQuery{

    static async RecuperaTodasCaixas(){
        return await sequelize.query(
            `select caixa.idCaixa, caixa.nroIncremento, caixa.desCaixa from Caixa caixa`,
            { type: 'SELECT' });
    }

    static async RecuperaAvaliacaoCaixaAtual(idCartao:number){
        return await sequelize.query(
            `select idCaixa from Avaliacao where idCartao = :idCartao order by idCartao limit 1 `,
            {replacements: { idCartao: idCartao}, type: 'SELECT' });
    }

    static async RecuperaProximaAvaliacao(idPessoa : number, idConteudo:number){
        return await sequelize.query(
            `select pergunta.txtPergunta
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
            and ( avaliacao.idCartao is null or avaliacao.DtaProximaAvaliacao <= now() )`,
            {replacements: { idPessoa: idPessoa, idConteudo : idConteudo}, type: 'SELECT' });
        
    }
}