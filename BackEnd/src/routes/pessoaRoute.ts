import {  PessoaService } from '../services/pessoaService'
import {PessoaRules} from '../rules/pessoaRules'
import express, { Router } from 'express'
import { sequelize } from '../instances/sequelize';
import { Pessoa } from '../models/pessoaModel';
import { Repository } from 'sequelize-typescript';

class PessoaRoute {

    private readonly _pessoaRepository !: Repository<Pessoa>

    constructor(pessoaRepository: Repository<Pessoa>) {
      this._pessoaRepository = pessoaRepository;
    }
    

    public montaRotas(): Router {


        let router = express.Router();
        
        router.post('/create',(request: any,response:any)=>{
            let pessoaService = new PessoaService(this._pessoaRepository);
            return pessoaService.create(request,response, null);
        });
        // router.post('/login', pessoaService.login);
        // router.post('/forgot', pessoaService.forgotPassword);
        // router.post('/reset', pessoaService.newPassword);
        // router.post('/verifyLink', pessoaService.verifyEmail);

        return router;
    }


}
export { PessoaRoute }