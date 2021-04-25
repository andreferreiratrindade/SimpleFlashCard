import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
import { _modelsOutput } from "src/models/_modelsOutput";
export class CartaoService {


    public async adicionar(cartao: _modelsInput.Cartao) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/api/cartao",

            requiresToken: true,
            payload: cartao
        }
        try {
            let result = await HttpClient.post(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async listar(idConteudo) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/api/cartao",
            payload:{idConteudo:idConteudo},
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.obj;
        } catch (error) {
            return null
        }
    }

    public async atualizar(cartao: _modelsInput.Cartao) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/api/cartao",

            requiresToken: true,
            payload: cartao
        }
        try {
            let result = await HttpClient.put(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

 

    public async RecuperaPorId(idCartao : number){


        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/api/cartao/${idCartao}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.obj;
        } catch (error) {
            return null
        }
    }


    public async excluir(idCartao : number){
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/api/cartao/${idCartao}`,
            requiresToken: true,
        }
        try {
            let result = await HttpClient.delete(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);
        
            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

}