import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { ConfigService } from "./ConfigService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";

export class HttpClient  {
  static get  (parameters: IHttpClientRequestParameters): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // extract the individual parameters
      const { url, payload, requiresToken } = parameters;
      
      // axios request options like headers etc
      const options: AxiosRequestConfig = {
         headers: { 
          'Access-Control-Allow-Origin': "*",
        },
         params:payload
        //data:payload
      };
      
      if (requiresToken) {
        const token = ConfigService.getToken();
        options.headers.authorization = ConfigService.getToken();
      }
      
      axios
        .get(url,options)
        .then((response: any) => {
          resolve(response);
        })
        .catch((response: any) => {

          reject(response);
        });
    });
  }

  

 static  post(parameters: IHttpClientRequestParameters): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "GET",
          "Content-Security-Policy": "*"
        }
      };

      if (requiresToken) {
             const token = ConfigService.getToken();
             options.headers.Authorization = token;

      }

      // finally execute the GET request with axios:
      axios
        .post(url, payload, options)
        .then((response: any) => {
          resolve(response.data as any);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }

  static  put(parameters: IHttpClientRequestParameters): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "GET",
          "Content-Security-Policy": "*"
        }
      };

      if (requiresToken) {
             const token = ConfigService.getToken();
             options.headers.Authorization = token;
      }

      // finally execute the GET request with axios:
      axios
        .put(url, payload, options)
        .then((response: any) => {
          resolve(response.data as any);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }
}