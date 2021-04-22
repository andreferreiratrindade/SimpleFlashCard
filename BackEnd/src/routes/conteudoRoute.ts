import {  PessoaService } from '../services/pessoaService'
import express, { Router } from 'express'
import { Conteudo } from '../models/conteudoModel';
import { Repository } from 'sequelize-typescript';
import { ConteudoService } from '../services/conteudoService';

export class ConteudoRoute {

    private readonly _conteudoRepository !: Repository<Conteudo>

    constructor(conteudoRepository: Repository<Conteudo>) {
      this._conteudoRepository = conteudoRepository;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post("",(request: any,response:any)=>{
            console.log("adicionar conteudo");
            let conteudoService = new ConteudoService(this._conteudoRepository);
            return conteudoService.adicionar(request,response);
        });
        router.get("",(request: any,response:any)=>{
            console.log("listagem");
            let conteudoService = new ConteudoService(this._conteudoRepository);
            return conteudoService.listagem(request,response);
        });

        router.put("",(request: any,response:any)=>{
            console.log("Atualiza");
            let cartaoService = new ConteudoService(this._conteudoRepository);
            return cartaoService.atualizar(request,response);
        });
      
        return router;
    }


}