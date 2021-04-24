
import express from 'express';
import * as config from './config/config.json'
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import {PessoaRoute} from "./routes/pessoaRoute"
import {TokenService} from "./services/tokenService"
import { sequelize } from './instances/sequelize';
import { Conteudo  } from './models/conteudoModel';
import { Pessoa  } from './models/pessoaModel';
import { ConteudoRoute } from './routes/conteudoRoute';
import { Cartao } from './models/cartaoModel';
import { CartaoRoute } from './routes/cartaoRoute';
import { Pergunta } from './models/perguntaModel';
import { Resposta } from './models/respostaModel';
const app = express();
const apiRoutes = express.Router()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(logger('dev'));

// middleware


let pessoaRepository =  sequelize.getRepository(Pessoa);
let conteudoRepository =  sequelize.getRepository(Conteudo);
let cartaoRepository =  sequelize.getRepository(Cartao);
let  perguntaRepository =  sequelize.getRepository(Pergunta);
let respostaRepository =  sequelize.getRepository(Resposta);
let pessoaRoute = new PessoaRoute(pessoaRepository);
let conteudoRoute = new ConteudoRoute(conteudoRepository);
let cartaoRoute = new CartaoRoute(cartaoRepository,perguntaRepository,respostaRepository);

// public
 app.use('/pessoa',pessoaRoute.montaRotas() );

// Private
 apiRoutes.use(TokenService.validaToken);
 apiRoutes.use('/conteudo', conteudoRoute.montaRotas());
 apiRoutes.use('/cartao', cartaoRoute.montaRotas());

 app.use('/api',apiRoutes);

 //Testando a brench


  

var port = config.server.port;

app.listen(process.env.PORT || port);

console.log('App started on port ' + port);