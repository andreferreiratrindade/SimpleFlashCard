<template>
  <q-dialog ref="dialog" v-model="showModal" persistent cancel>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-form @submit="salvar" class="q-gutter-md">
         <q-card-section>
          <div class="text-h6">Alterar cartão</div>
        </q-card-section>
        <q-card-section>

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
import { CartaoService } from "../../../services/CartaoService";
import { _modelsInput } from "../../../models/_modelsInput";

@Component
export default class DialogAtualizarCartao extends Vue{

  showModal : boolean = false;

  @Prop({ type: Function, default: () => false })
	readonly refreshTable!: Function;
  
  
  public idCartao : number  = 0

    private _cartaoService !: CartaoService;
    public cartao : _modelsInput.Cartao = {
      txtPergunta: "",
      txtResposta: "",
      idConteudo: null,
      idCartao : this.idCartao
    }


    show(idCartao: number){
        this.showModal = true;
        this.idCartao = idCartao;

        this._cartaoService.RecuperaPorId(this.idCartao)
        .then((result: any) => {
          this.cartao = result;
        })
        .catch((err: any) => {
          this.$q.notify(err);
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    }

   public salvar() {
    this._cartaoService
      .atualizar(this.cartao)
      .then((result: any) => {
        this.$q.notify(result);
        this.cartao = {txtResposta:null, txtPergunta: null, idCartao: null,idConteudo: null}
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
    this._cartaoService = new CartaoService();
  }
}
</script>