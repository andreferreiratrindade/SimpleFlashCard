import {  AvaliacaoService } from '../services/avaliacaoService'
import express, { Router } from 'express'
import { Avaliacao } from '../models/avaliacaoModel';
import { Repository } from 'sequelize-typescript';
import { ConteudoService } from '../services/conteudoService';

export class AvaliacaoRoute {

    private readonly _avaliacaoRepository !: Repository<Avaliacao>

    constructor(avaliacaoRepository: Repository<Avaliacao>) {
      this._avaliacaoRepository = avaliacaoRepository;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post("",(request: any,response:any)=>{
            console.log("adicionar Avaliação");
            let avaliacaoService = new AvaliacaoService(this._avaliacaoRepository);
            return avaliacaoService.adicionar(request,response);
        });


        router.get("/RecuperarProximaAvaliacao",(request: any,response:any)=>{
            console.log("RecuperarProximaAvaliacao");
            let avaliacaoService = new AvaliacaoService(this._avaliacaoRepository);
            return avaliacaoService.recuperaProximaAvaliacao(request,response);
        });


        return router;
    }
}