export namespace _modelsOutput{


    export interface Conteudo{
        idConteudo: number | null, 
        nmeConteudo: string | null,
        qtdCartao:number| null
    }

    export interface Cartao{
        idConteudo: number, 
        idCartao:number | null, 
        txtPergunta:string | null, 
        txtResposta:string| null

    }

