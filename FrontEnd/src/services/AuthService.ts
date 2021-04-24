import { _modelsInput } from "src/models/_modelsInput";
import { ConfigService } from "./ConfigService";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"

export class AuthService {

    async login(pessoa: _modelsInput.PessoaLogin) {
        let parameters: IHttpClientRequestParameters
            = {
                url: Config.api + "/pessoa/login",
            requiresToken: false,
            payload: pessoa
        }
        try {
        let result = await HttpClient.post(parameters);
        let notify: _helperModel.Notify;

        if (result.ok) {
            ConfigService.setToken(result.obj.token);
            ConfigService.setPessoa(result.obj.pessoa);
            notify = NotifyHelper.sucesso()
        } else {
            notify = NotifyHelper.erro(result.error);
        }

        return notify;
    } catch (error) {
        return NotifyHelper.erro(error)
    }
    }


    async adicionar(pessoa: _modelsInput.PessoaAdicionar) {
        let parameters: IHttpClientRequestParameters
            = {
                url: Config.api + "/pessoa/create",

            requiresToken: false,
            payload: pessoa
        }
        try {
            let result = await HttpClient.post(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }
}