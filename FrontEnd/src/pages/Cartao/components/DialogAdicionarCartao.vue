<template>
  <q-dialog ref="dialog" v-model="showModal" persistent cancel>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-form @submit="salvar" >
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Novo cartão</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input
            v-model="cartao.txtPergunta"
            type="text"
            label="Pergunta"
            filled
            require
            lazy-rules
            focus
            :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
          />

           <q-input
            v-model="cartao.txtResposta"
            type="text"
            label="Resposta"
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
import { CartaoService } from "src/services/CartaoService";
import { _modelsInput } from "../../../models/_modelsInput";

@Component
export default class DialogAdicionarCartao extends Vue{

  showModal : boolean = false;

  @Prop({ type: Function, default: () => false })
	readonly refreshTable!: Function;

  @Prop()
	readonly idConteudo!: number;

    private _cartaoService !: CartaoService;
    public cartao : _modelsInput.Cartao =  {
      idConteudo: this.idConteudo,
      idCartao : null,
      txtPergunta : null, 
      txtResposta:null
    };


    show(){
        this.showModal = true
    }

   public salvar() {
    this._cartaoService
      .adicionar(this.cartao)
      .then((result: any) => {
        this.$q.notify(result);
        this.cartao = this.initCartao();
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
    this.cartao = this.initCartao();
    this._cartaoService = new CartaoService();
  }

  public  initCartao(){
    return {
      idConteudo: this.idConteudo,
      idCartao : null,
      txtPergunta : null, 
      txtResposta:null
    };
  }
}
</script>