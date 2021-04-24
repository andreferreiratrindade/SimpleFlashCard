import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class ConteudoService {


    public async adicionar(conteudo: _modelsInput.Conteudo) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/api/conteudo",

            requiresToken: true,
            payload: conteudo
        }
        try {
            let result = await HttpClient.post(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async listar() {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/api/conteudo",
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.obj;
        } catch (error) {
            return null
        }
    }

    public async atualizar(conteudo: _modelsInput.Conteudo) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/api/conteudo",

            requiresToken: true,
            payload: conteudo
        }
        try {
            let result = await HttpClient.put(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

}