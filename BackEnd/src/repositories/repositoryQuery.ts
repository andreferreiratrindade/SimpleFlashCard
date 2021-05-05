import { sequelize } from "../instances/sequelize";

export class RepositoryQuery {

  static async RecuperaTodasCaixas() {
    return await sequelize.query(
      `select caixa.idCaixa, caixa.nroIncremento, caixa.desCaixa from Caixa caixa`,
      { type: 'SELECT' });
  }

  static async RecuperaAvaliacaoCaixaAtual(idCartao: number) {
    return await sequelize.query(
      `select idCaixa from Avaliacao where idCartao = :idCartao order by idCartao limit 1 `,
      { replacements: { idCartao: idCartao }, type: 'SELECT' });
  }

  static async RecuperaProximaAvaliacao(idPessoa: number, idConteudo: number) {
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
      { replacements: { idPessoa: idPessoa, idConteudo: idConteudo }, type: 'SELECT' });

  }

  static async RecuperaCartaoPorId(idCartao: number) {
    return await sequelize.query(
      `select pergunta.txtPergunta
        , resposta.txtResposta
        , cartao.idCartao
        , pergunta.idPergunta
        , resposta.idResposta
         from Cartao cartao
        inner join Pergunta pergunta
          on pergunta.IdCartao = cartao.IdCartao
        inner join Resposta resposta
          on resposta.IdCartao = cartao.IdCartao
          where cartao.IdCartao = :idCartao `,
      { replacements: { idCartao: idCartao }, type: 'SELECT' });
  }

  static async ReupceraListaCartao(idConteudo: number) {
    return await sequelize.query(
      `select pergunta.txtPergunta
      , resposta.txtResposta
      , cartao.idCartao
      , pergunta.idPergunta
      , resposta.idResposta
       from Cartao cartao
      inner join Pergunta pergunta
        on pergunta.IdCartao = cartao.IdCartao
      inner join Resposta resposta
        on resposta.IdCartao = cartao.IdCartao
        where cartao.IdConteudo = :idConteudo `,
      { replacements: { idConteudo: idConteudo }, type: 'SELECT' });
  }

  static async RecuperaConteudos(idPessoa : number){
    return await sequelize.query(
      `select conteudo.idConteudo, 
              conteudo.nmeConteudo,
              (select count(idCartao) from Cartao where idConteudo =  conteudo.idConteudo   ) as qtdCartao
         from Conteudo conteudo
  
        where conteudo.IdPessoa = :idPessoa `,
      {replacements: { idPessoa:  idPessoa}, type: 'SELECT' });
  }

  /**
   * Recupera total de avaliações para serem realizadas hoje e total de avaliações realizadas hoje
   *
   * @param idConteudo
   */
  static async RecuperaTotalAvaliacaoPorTotalPrevisto(idConteudo : number){
    return await sequelize.query(
      `select (
        select count(distinct cartao.IdCartao) as TotalParaFazerHoje
        from Conteudo conteudo
        inner join Cartao cartao 
          on conteudo.IdConteudo = cartao.IdConteudo
        left join Avaliacao avaliacao 
          on avaliacao.IdCartao  =cartao.IdCartao
        where conteudo.IdConteudo = :IdConteudo and(ifnull(avaliacao.IdAvaliacao,0) = 0  
			or (
				CURDATE() = DATE_FORMAT(DtaProximaAvaliacao, '%Y-%m-%d')
			))
          and avaliacao.idAvaliacao = (select max(idAvaliacao) from Avaliacao where IdCartao  =cartao.IdCartao)
          )
         as TotalParaFazerHoje
        ,    
        (select count(distinct cartao.IdCartao) as TotalFeitoHoje
        from Conteudo conteudo
        inner join Cartao cartao 
          on conteudo.IdConteudo = cartao.IdConteudo
        inner join Avaliacao avaliacao 
          on avaliacao.IdCartao  =cartao.IdCartao
        where conteudo.IdConteudo = :IdConteudo and CURDATE() = DATE_FORMAT(DtaInclusao, '%Y-%m-%d')
        and avaliacao.idAvaliacao = (select max(idAvaliacao) from Avaliacao where IdCartao  =cartao.IdCartao)) as TotalFeitoHoje
        ,    
        (select count(distinct cartao.IdCartao) as TotalErroParaFazerHoje
        from Conteudo conteudo
        inner join Cartao cartao 
          on conteudo.IdConteudo = cartao.IdConteudo
        inner join Avaliacao avaliacao 
          on avaliacao.IdCartao  =cartao.IdCartao
        where conteudo.IdConteudo = :IdConteudo and CURDATE() = DATE_FORMAT(DtaProximaAvaliacao, '%Y-%m-%d') 
			and avaliacao.idTipoAvaliacao = 2
			and avaliacao.idAvaliacao = (select max(idAvaliacao) from Avaliacao where IdCartao  =cartao.IdCartao)
            ) as TotalErroParaFazerHoje`,
      {replacements: { IdConteudo:  idConteudo}, type: 'SELECT' });
  }
}