
import { sequelize } from '../instances/sequelize';
import { check, validationResult } from 'express-validator';
import { Avaliacao } from '../models/avaliacaoModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';

export class AvaliacaoService {

  private readonly _avaliacaoRepository !: Repository<Avaliacao>
 

  constructor(AvaliacaoRepository: Repository<Avaliacao>) {
    this._avaliacaoRepository = AvaliacaoRepository;
  }

  public async adicionarValidacao(req: any) {
    await check("idCartao")
      .notEmpty()
      .withMessage("Campo é de preenchimento obrigatório")
      .run(req);

      await check("idTipoAvaliacao")
      .notEmpty()
      .withMessage("Campo é de preenchimento obrigatório")
      .run(req);

      await check("IdCaixa")
      .notEmpty()
      .withMessage("Campo é de preenchimento obrigatório")
      .run(req);
  }

  public async adicionar(req: any, res: any) {

    
    await this.adicionarValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    let Avaliacao = { 
                  idCartao : req.body.idCartao, 
                  idTipoAvaliacao : req.decoded.idTipoAvaliacao,
                 };
    let resultCreate = await this._avaliacaoRepository.create(Avaliacao);


    return RetornoRequest.Response(resultCreate,null,res,HttpStatusCode.OK);
  }



  public async recuperaProximaAvaliacao(req: any, res: any){


    let idPessoa = req.decoded.idPessoa

    const avaliacao  = await sequelize.query(
    `select pergunta.txtPergunta
    ,	  resposta.txtResposta
    ,    conteudo.idPessoa
    , 	caixaAcerto.DesCaixa as DesAcerto
    ,	caixaErro.DesCaixa as DesErro
    from Cartao cartao 
    inner join Conteudo conteudo
      on conteudo.idConteudo = cartao.idConteudo
    inner join Pergunta pergunta 
        on cartao.idCartao = pergunta.idCartao
    inner join Resposta resposta
        on resposta.idCartao = cartao.idCartao
    left join Avaliacao avaliacao 
      on avaliacao.IdCartao = cartao.IdCartao
      and avaliacao.idAvaliacao = (select idAvaliacao from Avaliacao where cartao.IdCartao = idCartao order by DtaProximaAvaliacao limit 1 )
    left join Caixa caixaAcerto 
      -- Se acertar, cartão será enviado para proxima caixa 
      on ( caixaAcerto.idCaixa = IFNULL(avaliacao.idCaixa,0) + 1)
     left join Caixa caixaErro 
      -- Se errar, cartão será enviado para primeira caixa
      on ( caixaErro.idCaixa = IFNULL(avaliacao.idCaixa,1))   
        
    where conteudo.idPessoa = :idPessoa
    and ( avaliacao.idCartao is null or avaliacao.DtaProximaAvaliacao <= now() )`,
    {replacements: { idPessoa: idPessoa}, type: 'SELECT' });

  
    return RetornoRequest.Response(avaliacao[0], null, res, HttpStatusCode.OK);
  }
  
}
