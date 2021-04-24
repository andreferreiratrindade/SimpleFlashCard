import { ConfigService } from "src/services/ConfigService"

export default ({router}) => {
  router.beforeEach((to, from, next) => {
    
      if( !ConfigService.getToken() && to.path !== '/auth-login' && to.path !== '/auth-register'){
        next('/auth-login')
      }else{
        next()
      }    
    })
}