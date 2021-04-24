<template>
  <div class="q-pa-md">
    <q-table
      title="Conteúdos"
      :data="data"
      :columns="colunas"
      :loading="loading"
      :selected.sync="selected"
      row-key="idConteudo"
      color="primary"
      :pagination.sync="pagination"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="blue"
            @click="cartoes(props)"
            icon="far fa-id-card"
          >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <strong>Cartões</strong>
            </q-tooltip>
          </q-btn>
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
      <q-btn fab icon="add" color="positive" @click="showNovoConteudo">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>Adicionar</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
    <dialog-adicionar-conteudo
      ref="dialogAdicionarConteudo"
      :refreshTable="recuperaConteudos"
    >
    </dialog-adicionar-conteudo>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DialogAdicionarConteudo from "./components/DialogAdicionarConteudo.vue";
import { ConteudoService } from "src/services/ConteudoService";
@Component({
  components: { DialogAdicionarConteudo },
})
export default class ConteudoList extends Vue {
  loading: boolean = true;
  pagination: any =  {
        rowsPerPage: 30 // current rows per page being displayed
  }
  private _conteudoService!: ConteudoService;

  colunas: Array<object> = [
    {
      name: "nmeConteudo",
      label: "Conteudo",
      field: "nmeConteudo",
      align: "left",
    },
    {
      name: "qtdCartao",
      label: "Qtd. Cartões",
      field: "qtdCartao",
      align: "left",
    },
    { name: "actions", label: "", field: "", align: "center" },
  ];

  data: any[] = [];

  recuperaConteudos() {
    this.loading = true;
    this._conteudoService
      .listar()
      .then((result) => {
        this.data = result;
        this.loading = false;
      })
      .catch()
      .finally();
  }

  showNovoConteudo() {
    (this.$refs.dialogAdicionarConteudo as Vue & { show(): boolean }).show();
  }

  editar(row: any) {

   

  }

  excluir(row: any) {


  }

  cartoes(row: any) {
    this.$router.push({
        path: `cartao/${row.row.idConteudo}`
    }) 
  }
  created() {
    this._conteudoService = new ConteudoService();
    this.recuperaConteudos();
  }
}
</script>