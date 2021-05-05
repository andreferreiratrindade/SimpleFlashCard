
import { sequelize } from '../instances/sequelize';
import { check, validationResult } from 'express-validator';
import { Avaliacao } from '../models/avaliacaoModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { RepositoryQuery } from '../repositories/repositoryQuery';
import { Constants } from '../constants/Constants';

export class AvaliacaoService {

  private readonly _avaliacaoRepository !: Repository<Avaliacao>
 

  constructor(AvaliacaoRepository: Repository<Avaliacao>) {
    this._avaliacaoRepository = AvaliacaoRepository;
  }

  public async adicionarValidacao(req: any) {
    await check("idCartao")
      .notEmpty()
      .withMessage("Campo é de preenchimento obrigatório")
      .isNumeric()
      .withMessage("Campo é do tipo númerico")
      .run(req);

      await check("idTipoAvaliacao")
      .notEmpty()
      .withMessage("Campo é de preenchimento obrigatório")
      .isNumeric()
      .withMessage("Campo é do tipo númerico")
      .custom((value:any)=>{

        let tiposValidos = [Constants.TipoAtendimetno.ERREI, Constants.TipoAtendimetno.ACERTEI];

        return tiposValidos.filter(x=>{return x == value});

      })
      .withMessage("Campo permite apenas os valores 1 para Acertei ou 2 para Errei")
      .run(req);
  }

  public async adicionar(req: any, res: any) {

    
    await this.adicionarValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    // recupera caixas 
    let caixas = await RepositoryQuery.RecuperaTodasCaixas(); 

    let caixaUltimaAvaliacao = await RepositoryQuery.RecuperaAvaliacaoCaixaAtual( req.body.idCartao);
    let idCaixa : number = 0;

      console.log(caixaUltimaAvaliacao)
    // Caso o tipo de avaliacação seja ACERTEI e existe avaliação anterior
    if( req.body.idTipoAvaliacao == Constants.TipoAtendimetno.ACERTEI 
        && caixaUltimaAvaliacao.length > 0){
        const idCaixaAtual = caixaUltimaAvaliacao[0] as any;
        idCaixa = idCaixaAtual.idCaixa + 1;
    }

    if(req.body.idTipoAvaliacao == Constants.TipoAtendimetno.ERREI){
      idCaixa = 1;
    }


    // Recupera caixa de acordo com o tipo de avaliação selecionada
    let  caixa =  caixas.filter((x: any)=>{return x.idCaixa == idCaixa})[0] as any;


    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() + caixa.nroIncremento *60000);

    let Avaliacao = { 
                  idCartao : req.body.idCartao, 
                  idTipoAvaliacao : req.body.idTipoAvaliacao,
                  idCaixa : caixa.idCaixa,
                  dtaProximaAvaliacao : futureDate
                 };

    let resultCreate = await this._avaliacaoRepository.create(Avaliacao);


    return RetornoRequest.Response(resultCreate,null,res,HttpStatusCode.OK);
  }


  public async recuperaProximaAvaliacaoValidacao(req: any) {
    await check("idConteudo")
      .notEmpty()
      .withMessage("Campo é de preenchimento obrigatório")
      .run(req);
  }

  public async recuperaProximaAvaliacao(req: any, res: any){

    await this.recuperaProximaAvaliacaoValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    let idPessoa = req.decoded.idPessoa

    const avaliacao  = await RepositoryQuery.RecuperaProximaAvaliacao( idPessoa, parseInt(req.params.idConteudo));
  
    return RetornoRequest.Response(avaliacao[0], null, res, HttpStatusCode.OK);
  }


  public async recuperaTotalAvaliacaoPorTotalPrevisto(req: any, res: any){

    await this.recuperaProximaAvaliacaoValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const totais  = await RepositoryQuery.RecuperaTotalAvaliacaoPorTotalPrevisto(parseInt(req.params.idConteudo));
  
    return RetornoRequest.Response(totais[0], null, res, HttpStatusCode.OK);

  }
  
}
