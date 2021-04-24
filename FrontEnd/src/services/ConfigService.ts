
export class ConfigService{

    static setPessoa(pessoa: any){

        localStorage.setItem("pessoa",pessoa);
    }

    static getPessoa(){
        return localStorage.getItem("pessoa");
    }

    static getToken(){
        return localStorage.getItem("token");
    }

    static setToken(token:string){
        localStorage.setItem("token",token);
    }


}