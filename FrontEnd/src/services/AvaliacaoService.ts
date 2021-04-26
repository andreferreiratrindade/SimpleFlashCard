import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class AvaliacaoService {


    public async adicionar(avaliacao: _modelsInput.Avaliacao) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/api/avaliacao",

            requiresToken: true,
            payload: avaliacao
        }
        try {
            let result = await HttpClient.post(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async recuperaProximaAvaliacao(idConteudo:number) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/api/avaliacao/RecuperarProximaAvaliacao/${idConteudo}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.obj;
        } catch (error) {
            return null
        }
    }
}