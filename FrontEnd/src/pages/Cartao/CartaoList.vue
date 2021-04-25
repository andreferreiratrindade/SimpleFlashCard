<template>
  <div class="q-pa-md">
    <q-table
      title="Cartões"
      :data="data"
      :columns="colunas"
      :loading="loading"
      :selected.sync="selected"
      row-key="idCartao"
      color="primary"
       :pagination.sync="pagination"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="warning"
            @click="editar(props)"
            icon="edit"
          >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <strong>Editar</strong>
            </q-tooltip>
          </q-btn>
          <q-btn
            dense
            round
            flat
            color="red"
            @click="excluir(props)"
            icon="delete"
          >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <strong>Excluir</strong>
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="positive" @click="showNovoCartao">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>Adicionar</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
    <dialog-adicionar-cartao
      ref="dialogAdicionarCartao"
      :idConteudo="idConteudo"
      :refreshTable="recuperaCartoes"
    >
    </dialog-adicionar-cartao>

        <dialog-atualizar-cartao
      ref="dialogAtualizarCartao"
      :refreshTable="recuperaCartoes"
    >
    </dialog-atualizar-cartao>

    <dialog-excluir-cartao
      ref="dialogExcluirCartao"
      :refreshTable="recuperaCartoes"
    >
    </dialog-excluir-cartao>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DialogAdicionarCartao from "./components/DialogAdicionarCartao.vue";
import DialogAtualizarCartao from "./components/DialogAtualizarCartao.vue";
import DialogExcluirCartao from "./components/DialogExcluirCartao.vue";
import { CartaoService } from "../../services/CartaoService";

@Component({
  components: { DialogAdicionarCartao , DialogAtualizarCartao, DialogExcluirCartao},
})
export default class CartaoList extends Vue {
  loading: boolean = true;
  idConteudo : number = 0; 
  pagination: any =  {
        rowsPerPage: 30 // current rows per page being displayed
  }

  private _cartaoService!: CartaoService;
  data: any[] = [];

  colunas: Array<object> = [
    {
      name: "txtPergunta",
      label: "Pergunta",
      field: "txtPergunta",
      align: "left",
      class:"col-6"
    },
    {
      name: "txtResposta",
      label: "Resposta",
      field: "txtResposta",
      align: "left",
      class:"col-6"

    },
    { name: "actions", label: "", field: "", align: "center"
     },
  ];

  recuperaCartoes() {
    this.loading = true;
    this._cartaoService
      .listar(this.idConteudo)
      .then((result) => {
        this.data = result;
        this.loading = false;
      })
      .catch()
      .finally();
  }

  showNovoCartao() {
    (this.$refs.dialogAdicionarCartao as Vue & { show(): boolean }).show();
  }

  editar(row: any) {

    (this.$refs.dialogAtualizarCartao as Vue & { show(idCartao:number): boolean }).show(row.row.idCartao);
   
  }

  excluir(row: any) {
    (this.$refs.dialogExcluirCartao as Vue & { show(idCartao:number): boolean }).show(row.row.idCartao);
  }

  created() {
    
    this.idConteudo = parseInt(this.$route.params.idConteudo);
    this._cartaoService = new CartaoService();
    this.recuperaCartoes();
  }
}
</script>