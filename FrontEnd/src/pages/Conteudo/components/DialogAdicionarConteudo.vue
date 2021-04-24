<template>
  <q-dialog ref="dialog" v-model="showModal" persistent cancel>
    <q-card>
      <q-form @submit="salvar" class="q-gutter-md">
         <q-card-section>
          <div class="text-h6">Novo conteúdo</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="conteudo.nmeConteudo"
            type="text"
            label="Conteúdo"
            filled
            require
            lazy-rules
            focus
            :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
          />
          
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="primary" label="Adicionar" type="submit" value/>
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
import { ConteudoService } from "src/services/ConteudoService";
import { _modelsInput } from "../../../models/_modelsInput";

@Component
export default class DialogAdicionarConteudo extends Vue{

  showModal : boolean = false;

  @Prop({ type: Function, default: () => false })
	readonly refreshTable!: Function;

    private _conteudoService !: ConteudoService;
    public conteudo : _modelsInput.Conteudo = {
      nmeConteudo: "",
      idConteudo: null
    }


    show(){
        this.showModal = true
    }

   public salvar() {
    this._conteudoService
      .adicionar(this.conteudo)
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