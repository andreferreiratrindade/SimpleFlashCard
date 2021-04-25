

import { check, validationResult } from 'express-validator';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Cartao } from '../models/cartaoModel';
import { Resposta } from '../models/respostaModel';
import { Pergunta } from '../models/perguntaModel';
import { sequelize } from '../instances/sequelize';

export class CartaoService {

  private readonly _cartaoRepository !: Repository<Cartao>
  private readonly _perguntaRepository !: Repository<Pergunta>
  private readonly _respostaRepository !: Repository<Resposta>
  constructor(cartaoRepository: Repository<Cartao>, perguntaRepository: Repository<Pergunta>, respostaRepository: Repository<Resposta>) {
    this._cartaoRepository = cartaoRepository;
    this._respostaRepository = respostaRepository;
    this._perguntaRepository = perguntaRepository;
  }


  public async adicionarValidacao(req: any) {
    await check("idConteudo")
      .notEmpty()
      .withMessage("Campo Conteudo é de preenchimento obrigatório")
      .run(req);

    await check("txtPergunta")
      .notEmpty()
      .withMessage("Campo Pergunta é de preenchimento obrigatório")
      .run(req);

    await check("txtResposta")
      .notEmpty()
      .withMessage("Campo Resposta é de preenchimento obrigatório")
      .run(req);
  }

  public async adicionar(req: any, res: any) {

    await this.adicionarValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    console.log(req.body)

    let Cartao = {
      idConteudo: req.body.idConteudo
    };
    let resultCreate = await this._cartaoRepository.create(Cartao);


    let pergunta = {
      idCartao: resultCreate.idCartao,
      txtPergunta: req.body.txtPergunta
    }

    // Adicionar pergunta
    let resultePergunta = await this._perguntaRepository.create(pergunta);


    let resposta = {
      idCartao: resultCreate.idCartao,
      txtResposta: req.body.txtResposta
    }
    // Adicionar Resposta
    let resulteResposta = await this._respostaRepository.create(resposta);

    return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
  }

  public async listagemValidacao(req: any){
    await check("idConteudo")
    .notEmpty()
    .withMessage("Campo Conteudo é de preenchimento obrigatório")
    .isNumeric()
    .withMessage("Campo do tipo numerico")
    .run(req);
  }

  public async listagem(req: any, res: any){
    await this.listagemValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const cartoes  = await sequelize.query(
    `select pergunta.txtPergunta
    , resposta.txtResposta
    , cartao.idCartao
    , pergunta.idPergunta
    , resposta.idResposta
     from Cartao cartao
    inner join Pergunta pergunta
      on pergunta.IdCartao = cartao.IdCartao
    inner join resposta resposta
      on resposta.IdCartao = cartao.IdCartao
      where cartao.IdConteudo = :idConteudo `,
    {replacements: { idConteudo: req.query.idConteudo }, type: 'SELECT' });

    return RetornoRequest.Response(cartoes, null, res, HttpStatusCode.OK);
  }


  public async atualizarValidacao(req: any){
    await check("idCartao")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .run(req);

    await check("txtResposta")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .run(req);

    await check("txtPergunta")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .run(req);
  }

  public async atualizar(req: any, res: any){
    await this.atualizarValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    let conteudoResposta = {txtResposta : req.body.txtResposta };
    let resultUpdateResposta= await this._respostaRepository.update(conteudoResposta, {where:{idCartao:req.body.idCartao}});

    let conteudoPergunta = {txtPergunta : req.body.txtPergunta };
    let resultUpdatePergunta= await this._perguntaRepository.update(conteudoPergunta, {where:{idCartao:req.body.idCartao}});
    return RetornoRequest.Response([resultUpdatePergunta, resultUpdateResposta ],null,res,HttpStatusCode.OK);
  }

  
  public async recuperacaPorIdValidacao(req: any){
    await check("idCartao")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .isNumeric()
    .withMessage("Campo deverá ser do tipo numerico")
    .run(req);

  }

  public async recuperaPorId(req: any, res: any){

    await this.recuperacaPorIdValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const cartao  = await sequelize.query(
      `select pergunta.txtPergunta
      , resposta.txtResposta
      , cartao.idCartao
      , pergunta.idPergunta
      , resposta.idResposta
       from Cartao cartao
      inner join Pergunta pergunta
        on pergunta.IdCartao = cartao.IdCartao
      inner join resposta resposta
        on resposta.IdCartao = cartao.IdCartao
        where cartao.IdCartao = :idCartao `,
      {replacements: { idCartao: req.params.idCartao }, type: 'SELECT' });

  
    return RetornoRequest.Response(cartao[0], null, res, HttpStatusCode.OK);
  }

  public async excluirValidacao(req: any){
    await check("idCartao")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .isNumeric()
    .withMessage("Campo deverá ser do tipo numerico")
    .run(req);

  }

  public async excluir(req: any, res: any){

    await this.recuperacaPorIdValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const conteudo = await this._cartaoRepository.destroy({where:{idCartao: req.params.idCartao}});

  
    return RetornoRequest.Response(conteudo, null, res, HttpStatusCode.OK);
  }
  
}
