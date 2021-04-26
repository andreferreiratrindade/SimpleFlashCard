import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'auth-register',
        name: 'register',
        component: () => import('pages/Auth/Register.vue')
      },
      {
        path: 'auth-login',
        name: 'login',
        component: () => import('pages/Auth/Login.vue')
      },{
        path: 'conteudo',
        name: 'conteudo',
        component: () => import('pages/Conteudo/ConteudoList.vue')
      },{
        path: 'cartao/:idConteudo',
        name: 'cartao',
        component: () => import('pages/Cartao/CartaoList.vue')
      },{
          path: 'avaliacaoConteudo',
          name: 'avaliacaoConteudo',
          component: () => import('pages/Avaliacao/AvaliacaoConteudo.vue')
      },{
        path: 'avaliacao/:idConteudo',
        name: 'avaliacao',
        component: () => import('pages/Avaliacao/Avaliacao.vue')
      }
    ]
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
