[![CI](https://github.com/andreferreiratrindade/SimpleFlashCard/actions/workflows/ci.yml/badge.svg)](https://github.com/andreferreiratrindade/SimpleFlashCard/actions/workflows/ci.yml)


# SimpleFlashCard
# Link para acessar projeto em produção
https://andreferreiratrindade.github.io/SimpleFlashCardFrontEnd/



# Produção

  ## Banco de dados
      MySql hospedado em https://freedb.tech/
  
  ## FrontEnd
      GitHub Pages 
        Foi criado repositorio apenas para manter arquivos de publicação para utilização do GitHub Pages
  
  ## BackEnd
    Haroku
      Froi criado instancia no heroku para servir api em node.



## Estrutura do projeto 
  Projeto está estruturando da seguinte forma:
  ## Banco de dados
    Mysql
    
  ## BackEnd
    NodeJs com ExpressJs e TypeScript
    Para comunicação com o banco de dados é utilizado o sequelize
    
  ## FrontEnd
    Quasar com VueJs
    Validação das páginas privadas e login é realizado JWT



# Executando projeto - Maquina Local

## Banco de dados
  Após instalar e configurar Mysql na sua maquina local, executar script DataBase/tabelas.sql
  
## BackEnd
  Após instalar o NodeJS, executar os seguintes passos:
  
  1 - Alterar instancia de banco de dados
    ~/BackEnd/src/instances/sequelize.ts
    
        db = 'seu banco de dados'
        username = 'seu usuario do bancod e dados'
        password = 'senha de acesso ao banco de dados'
        host = 'endereço de conexao' //  caso não exista, pode excluir essa linha
  
  2 - Restaurando pacotes de dependencias. 
    No terminal de compandos, execute os seguintes comandos:
  
    $ npm install
    $ npm run-script buid
    $ npm start
  
## FrontEnd
  Executar os seguintes scripts no terminal de comandos:
  
    Adicionando Quasar
    $ npm install -g @quasar/cli
    
    Restaurando dependencias
    $ npm install
    
    Iniciando projeto
    $ npx quasar dev
  
 
  
  
