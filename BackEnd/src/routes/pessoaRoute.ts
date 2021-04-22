import {  PessoaService } from '../services/pessoaService'
import express, { Router } from 'express'
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
            console.log("Create");
            let pessoaService = new PessoaService(this._pessoaRepository);
            return pessoaService.create(request,response);
        });
        router.post('/login',(request: any,response:any)=>{
            console.log("login");
            let pessoaService = new PessoaService(this._pessoaRepository);
            return pessoaService.login(request,response);
        });
        // router.post('/forgot', pessoaService.forgotPassword);
        // router.post('/reset', pessoaService.newPassword);
        // router.post('/verifyLink', pessoaService.verifyEmail);

        return router;
    }


}
export { PessoaRoute }