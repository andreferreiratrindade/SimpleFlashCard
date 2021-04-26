<template>
  <div class="q-pa-md row justify-center" >
    <q-list bordered separator  class="col-4">
      <q-item clickable v-ripple v-for="conteudo in conteudos" :key="conteudo" @click="iniciarAvaliacao(conteudo)"> 
        <q-item-section>{{conteudo.nmeConteudo}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { _modelsOutput } from "../../models/_modelsOutput";
import { ConteudoService } from "../../services/ConteudoService";

@Component
export default class AvaliacaoConteudo extends Vue {
  
    private _conteudoService!: ConteudoService;
    private idConteudo : number  = 0;
    private conteudos : _modelsOutput.Conteudo = {
      idConteudo : null, 
      nmeConteudo : null, 
      qtdCartao : null
    }
    
    recuperaConteudos() {
      this._conteudoService
        .listar()
        .then((result) => {
          this.conteudos = result;
        })
        .catch()
        .finally();
    }

    created(){
        this._conteudoService = new ConteudoService();

        this.recuperaConteudos();
    }

    iniciarAvaliacao(row: any) {
      this.$router.push({
          path: `avaliacao/${row.idConteudo}`
      }) 
    }
}

</script>