

import * as Config from '../config/config.json'
import * as Jwt from 'jsonwebtoken'
import { CryptService } from './cryptService';
import { check, validationResult } from 'express-validator';
import { Pessoa } from '../models/pessoaModel';
import { Repository } from 'sequelize-typescript';

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

  public async create(req: any, res: any, next: any) {
    console.log("create");
    console.log(req.body);

    await this.createValidation(req);



    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    let pessoa = { ...req.body };
    console.log("Salvando");
    this._pessoaRepository.create(pessoa).then(x=>{

      console.log(x);

    }).catch(err=>{
      console.log(err)

    });

  }

  public login(req: any, res: any, next: any) {
    console.log("login");

    var result = {};
    var error = {};
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
