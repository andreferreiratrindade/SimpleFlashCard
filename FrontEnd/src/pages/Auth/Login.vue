<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-form @submit="submit" class="q-px-sm q-pt-xl q-pb-lg">
          <q-card square class="shadow-24" style="width: 300px; height: 485px">
            <q-card-section class="bg-deep-purple-7">
              <h4 class="text-h5 text-white q-my-md">Login</h4>
            </q-card-section>
            <q-card-section>
              <q-input
                square
                clearable
                v-model="usuario.txtEmail"
                type="email"
                label="E-mail"
                value
                required
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="usuario.txtSenha"
                type="password"
                label="Senha"
                value
                require
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions class="q-px-lg">
              <q-btn
                unelevated
                size="lg"
                value
                color="purple-4"
                class="full-width text-white"
                label="Login"
                type="submit"
              />
            </q-card-actions>
            <q-card-actions class="q-px-lg">
              <q-btn
                unelevated
                size="lg"
                color="purple-4"
                class="full-width text-white"
                label="Cadastre-se"
                @click="$router.push('/auth-register')"
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-sm">
              <p class="text-grey-6">Esqueceu sua senha?</p>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>


<script lang="ts">
import { IAuthService } from "src/services/interfaces/IAuthService";
import { Component, Vue } from "vue-property-decorator";
import { _modelInput } from "src/models/_modelsInput";
import { inject, injectable } from "inversify";
import myContainer from "src/config/inversify.config";
import { TYPES } from "src/config/types";

@Component
export default class Login extends Vue {
  _authService!: IAuthService;

  usuario: _modelInput.UsuarioLoginInputModel = {
    email: "",
    password: "",
    nome: "",
  };

  error: string = "";

  submit() {
    this._authService
      .login(this.usuario)
      .then((result: any) => {
        this.$router.replace({ name: "painelGerencial" });
      })
      .catch((err: any) => {
        this.$q.notify(err);
      });
  }

  created(): void {
    this._authService = myContainer.myContainer.get<IAuthService>(
      TYPES.AuthService
    );
  }
}
</script>
