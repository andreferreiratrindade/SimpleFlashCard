<template>
  <q-dialog ref="dialog" v-model="showModal" persistent cancel>
    <q-card style="width: 700px; max-width: 80vw;">

      <q-form @submit="salvar" class="q-gutter-md">
         <q-card-section>
          <div class="text-h6">Alterar conteúdo</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="conteudo.nmeConteudo"
            type="text"
            label="Conteúdo"
            filled
            require
            autofocus
            lazy-rules
            focus
            :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
          />
          
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="primary" label="Salvar" type="submit" value/>
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
export default class DialogAtualizarConteudo extends Vue{

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
      .atualizar(this.conteudo)
      .then((result: any) => {
        this.$q.notify(result);
        this.conteudo = {nmeConteudo:null,idConteudo: null}
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