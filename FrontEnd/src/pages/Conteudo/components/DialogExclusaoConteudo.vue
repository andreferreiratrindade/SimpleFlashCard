<template>
  <q-dialog ref="dialog" v-model="showModal" persistent cancel>
    <q-card>
      <q-form @submit="salvar" class="q-gutter-md">
         <q-card-section>
          <div class="text-h6">Excluir conteúdo <span>{{conteudo.nmeConteudo}}</span></div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Todos os cartões vinculaos à este conteúdo serão excluidos. 
          Deseja contuinuar?
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="primary" label="Sim" type="submit" value/>
          <q-btn
            label="Cancelar"
            @click="$emit('close')"
             value
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { ConteudoService } from "../../../services/ConteudoService";
import { _modelsInput } from "../../../models/_modelsInput";

@Component
export default class DialogExclusaoConteudo extends Vue{

  showModal : boolean = false;

  @Prop({ type: Function, default: () => false })
	readonly refreshTable!: Function;
  
  
  public idConteudo : number  = 0

    private _conteudoService !: ConteudoService;
    public conteudo : _modelsInput.Conteudo = {
      nmeConteudo: "",
      idConteudo: this.idConteudo
    }


    show(idConteudo: number){
        this.showModal = true;
        this.idConteudo = idConteudo;

        this._conteudoService.RecuperaPorId(this.idConteudo)
        .then((result: any) => {
          this.conteudo = result;
        })
        .catch((err: any) => {
          this.$q.notify(err);
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    }

   public salvar() {
    this._conteudoService
      .excluir(this.conteudo.idConteudo)
      .then((result: any) => {
        this.$q.notify(result);
        this.showModal = false;
        this.refreshTable();
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._conteudoService = new ConteudoService();
  }
}
</script>