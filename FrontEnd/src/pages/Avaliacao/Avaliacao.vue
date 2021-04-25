<template>
  <div class="q-pa-md row text-center self-center" >
    <h4 text-h4 class="col-12">
      <span>{{ avaliacao.txtPergunta }} </span>
    </h4>

<div  class="col-12" >
    <q-btn
      color="primary"
      label="Mostrar Resposta"
      @click="mostrarResposta = true"
      v-if="!mostrarResposta"/>

  </div>

    <div v-if="mostrarResposta" class="col-12" >
       <h4 text-h4 class="col-12">
      <span> {{ avaliacao.txtResposta }}</span>
        </h4>
        <q-btn color="negative"  @click="errou" class="col-2"  label="Errei" icon="thumb_down_alt" style="margin-right: 10px;"/>
        <q-btn color="positive" @click="acertou" class="col-2" label="Acertei" icon="thumb_up_alt"  style="margin-left: 10px;"/>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../models/_modelsInput";
import { AvaliacaoService } from "../../services/AvaliacaoService";

@Component
export default class Avaliacao extends Vue {
  loading: boolean = true;
  mostrarResposta: boolean = false;
  public avaliacao: _modelsInput.Avaliacao = {
    idCartao: null,
    txtPergunta: null,
    txtResposta: null,
    idTipoAvaliacao : null
  };

  private _avaliacaoService!: AvaliacaoService;

  recuperaProximaAvaliacao() {
    this.loading = true;
    this._avaliacaoService
      .recuperaProximaAvaliacao()
      .then((result) => {
        this.avaliacao = result;
        this.loading = false;
      })
      .catch()
      .finally();
  }

  created() {
    this._avaliacaoService = new AvaliacaoService();
    this.recuperaProximaAvaliacao();
  }

  errou(){
    this.avaliacao.idTipoAvaliacao = 2;

  this._avaliacaoService
      .adicionar(this.avaliacao)
      .then((result: any) => {
        this.$q.notify(result);
        this.recuperaProximaAvaliacao();
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  acertou(){
    this.avaliacao.idTipoAvaliacao = 1;
   this._avaliacaoService
      .adicionar(this.avaliacao)
      .then((result: any) => {
        this.$q.notify(result);
        this.recuperaProximaAvaliacao();
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }
}

</script>