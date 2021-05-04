import * as Jwt from 'jsonwebtoken'
import { CryptService } from './cryptService';
import { check, validationResult } from 'express-validator';
import { Pessoa } from '../models/pessoaModel';
import { Repository } from 'sequelize-typescript';
import { TokenService } from './tokenService';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Config } from '../config/Config';


export class PessoaService {

  private readonly _pessoaRepository !: Repository<Pessoa>

  constructor(pessoaRepository: Repository<Pessoa>) {
    this._pessoaRepository = pessoaRepository;
  }

  public async createValidation(req: any) {
    await check("txtEmail")
      .notEmpty()
      .withMessage("Campo E-mail é de preenchimento obrigatório")
      .run(req);

    await check("txtSenha")
      .notEmpty()
      .withMessage("Campo senha é de preenchimento obrigatório")
      .run(req);

    await check("nmePessoa")
      .notEmpty()
      .withMessage("Campo Nome é de preenchimento obrigatório")
      .run(req);
  }


  public async create(req: any, res: any) {
    try {
      console.log("create");
      console.log(req.body);

      await this.createValidation(req);


      const result = validationResult(req);
      if (!result.isEmpty()) {
        return RetornoRequest.Response(result.array(), null, res, HttpStatusCode.BAD_REQUEST);
      }
      let pessoa = {
        txtEmail: req.body.txtEmail,
        nmePessoa: req.body.nmePessoa,
        txtSenha: await CryptService.encrypt(req.body.txtSenha),
      };
      console.log("Salvando");

      let resultCreate = await this._pessoaRepository.create(pessoa, { isNewRecord: true })
      resultCreate.txtSenha = "";

      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  public async loginValidation(req: any) {
    await check("txtEmail")
      .notEmpty()
      .withMessage("Campo E-mail é de preenchimento obrigatório")
      .custom(async value => {

        let pessoa = { txtEmail: value };

        const u = await this._pessoaRepository.findOne({ where: pessoa });
        return !!u;

      })
      .withMessage('E-mail ou senha inválidos')
      .run(req);

    await check("txtSenha")
      .notEmpty()
      .withMessage("Campo senha é de preenchimento obrigatório")
      .custom(async (value: string) => {

        let pessoa = { txtEmail: req.body.txtEmail };

        const u = await this._pessoaRepository.findOne({ where: pessoa });
        return CryptService.compare(req.body.txtSenha, req.body.txtSenha);
      })
      .withMessage('E-mail ou senha inválidos')
      .run(req);
  }

  public async login(req: any, res: any): Promise<RetornoRequest> {
    console.log("login");
    this.loginValidation(req);
    const resultValidate = validationResult(req);
    if (!resultValidate.isEmpty()) {
      return RetornoRequest.Response(null, resultValidate.array(), res, HttpStatusCode.BAD_REQUEST);
    }

    let pessoa = { txtEmail: req.body.txtEmail };
    const u = await this._pessoaRepository.findOne({ where: pessoa });

    var tokenData = {
      nmePessoa: u?.nmePessoa,
      txtEmail: u?.txtEmail,
      idPessoa: u?.idPessoa,

    };

    let result = {
      pessoa: tokenData,
      token: Jwt.sign(tokenData, Config.keyInfo().privateKey, { expiresIn: Config.keyInfo().tokenExpiry }),
    };

    return RetornoRequest.Response(result, null, res, HttpStatusCode.OK);

  }

  public forgotPassword(req: any, res: any) {
    console.log("forgotPassword");
  }

  public newPassword(req: any, res: any) {
    console.log("newPassword");

  }

  verifyEmail(req: any, res: any) {
    console.log("verifyEmail");
  }

}
