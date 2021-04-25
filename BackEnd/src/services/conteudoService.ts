
import { sequelize } from '../instances/sequelize';
import { check, validationResult } from 'express-validator';
import { Conteudo } from '../models/conteudoModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';

export class ConteudoService {

  private readonly _conteudoRepository !: Repository<Conteudo>
 

  constructor(conteudoRepository: Repository<Conteudo>) {
    this._conteudoRepository = conteudoRepository;
  }

  public async adicionarValidacao(req: any) {
    await check("nmeConteudo")
      .notEmpty()
      .withMessage("Campo Conteudo é de preenchimento obrigatório")
      .run(req);
  }

  public async adicionar(req: any, res: any) {

    
    await this.adicionarValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    let conteudo = { 
                  nmeConteudo : req.body.nmeConteudo, 
                  idPessoa : req.decoded.idPessoa
                 };
    let resultCreate = await this._conteudoRepository.create(conteudo);


    return RetornoRequest.Response(resultCreate,null,res,HttpStatusCode.OK);
  }

  public async listagem(req: any, res: any){


    const cartoes  = await sequelize.query(
    `select conteudo.idConteudo, 
            conteudo.nmeConteudo,
            (select count(idCartao) from cartao where idConteudo =  conteudo.idConteudo   ) as qtdCartao
       from Conteudo conteudo

      where conteudo.IdPessoa = :idPessoa `,
    {replacements: { idPessoa: req.decoded.idPessoa }, type: 'SELECT' });

    return RetornoRequest.Response(cartoes, null, res, HttpStatusCode.OK);

  }

  public async atualizarValidacao(req: any){
    await check("idConteudo")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .isNumeric()
    .withMessage("Campo deverá ser do tipo numerico")
    .run(req);

    await check("nmeConteudo")
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
    let conteudo = {nmeConteudo : req.body.nmeConteudo };
    let resultUpdate= await this._conteudoRepository.update(conteudo, {where:{idConteudo:req.body.idConteudo}});

    return RetornoRequest.Response(resultUpdate,null,res,HttpStatusCode.OK);
  }

  public async recuperacaPorIdValidacao(req: any){
    await check("idConteudo")
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

    const conteudo = await this._conteudoRepository.findOne({where:{idConteudo: req.params.idConteudo}});

  
    return RetornoRequest.Response(conteudo, null, res, HttpStatusCode.OK);
  }

  public async excluirValidacao(req: any){
    await check("idConteudo")
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

    const conteudo = await this._conteudoRepository.destroy({where:{idConteudo: req.params.idConteudo}});

  
    return RetornoRequest.Response(conteudo, null, res, HttpStatusCode.OK);
  }
  
}
