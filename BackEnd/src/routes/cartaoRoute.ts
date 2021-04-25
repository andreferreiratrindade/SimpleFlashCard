import {  PessoaService } from '../services/pessoaService'
import express, { Router } from 'express'
import { Cartao } from '../models/cartaoModel';
import { Repository } from 'sequelize-typescript';
import { CartaoService } from '../services/cartaoService';
import { Pergunta } from '../models/perguntaModel';
import { Resposta } from '../models/respostaModel';

export class CartaoRoute {

    private readonly _cartaoRepository !: Repository<Cartao>
    private readonly _respostaRepository !: Repository<Resposta>
    private readonly _perguntaRepository !: Repository<Pergunta>

    constructor(cartaoRepository: Repository<Cartao>, perguntaRepository: Repository<Pergunta>,respostaRepository: Repository<Resposta>) {
      this._cartaoRepository = cartaoRepository;
      this._respostaRepository = respostaRepository;
      this._perguntaRepository = perguntaRepository;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post("",(request: any,response:any)=>{
            console.log("adicionar cartao");
            let cartaoService = new CartaoService(this._cartaoRepository,this._perguntaRepository,this._respostaRepository);
            return cartaoService.adicionar(request,response);
        });

        router.get("",(request: any,response:any)=>{
            console.log("listagem cartao");
            let cartaoService = new CartaoService(this._cartaoRepository,this._perguntaRepository,this._respostaRepository);
            return cartaoService.listagem(request,response);
        });

        router.put("",(request: any,response:any)=>{
            console.log("Atualiza");
            let cartaoService = new CartaoService(this._cartaoRepository,this._perguntaRepository,this._respostaRepository);
            return cartaoService.atualizar(request,response);
        });

        
        router.get("/:idCartao",(request: any,response:any)=>{
            console.log("RecuperaPorId");
            let cartaoService = new CartaoService(this._cartaoRepository,this._perguntaRepository,this._respostaRepository);
            return cartaoService.recuperaPorId(request,response);
        });

        router.delete("/:idCartao",(request: any,response:any)=>{
            console.log("Excluir");
            let cartaoService = new CartaoService(this._cartaoRepository,this._perguntaRepository,this._respostaRepository);
            return cartaoService.excluir(request,response);
        });
      
        return router;
    }


}