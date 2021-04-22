
import express from 'express';
import * as config from './config/config.json'
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import {PessoaRoute} from "./routes/pessoaRoute"
import {TokenService} from "./services/tokenService"
import { sequelize } from './instances/sequelize';
import { Pessoa } from './models/pessoaModel';
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
apiRoutes.use(TokenService.validaToken);


let pessoaRepository =  sequelize.getRepository(Pessoa);
let pessoaRoute = new PessoaRoute(pessoaRepository);

// public
 app.use('/pessoa',pessoaRoute.montaRotas() );


 app.use('/api',apiRoutes);
  

var port = config.server.port;

app.listen(process.env.PORT || port);

console.log('App started on port ' + port);