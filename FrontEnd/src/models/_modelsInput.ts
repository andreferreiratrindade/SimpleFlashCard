export namespace _modelsInput{

    export interface PessoaLogin{

        txtEmail: string | null,
        txtSenha:string| null,
    }

    export interface PessoaAdicionar{
        nmePessoa : string | null,
        txtEmail: string | null,
        txtSenha:string| null,
    }

    export interface Conteudo{
        idConteudo: number | null, 
        nmeConteudo: string | null
    }

    export interface Cartao{
        idConteudo: number , 
        idCartao: number | null, 
        txtPergunta:string| null, 
        txtResposta:string | null
    }

    export interface Avaliacao{
        idCartao : number| null, 
        idTipoAvaliacao : number| null, 
        txtPergunta : string  | null,
        txtResposta : string | null        
    }
}

 
}