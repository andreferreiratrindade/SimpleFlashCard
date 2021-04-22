
import  jwt from 'jsonwebtoken'
import * as config from '../config/config.json'

class TokenService{


    public  static validaToken(req: any , res:any , next:Function) {
        console.log("valida token");
        // check header or url parameters or post parameters for token
        var token =  req.headers['authentication'];
        
        // decode token
        if (token) {
      
          jwt.verify(token,config.key.privateKey,(err: any, decoded: any)=>{

            if (err) {          
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
              } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
              }
          });
      
        } else {
      
          // if there is no token
          // return an error
          return res.status(403).send({ 
              success: false, 
              message: 'No token provided.' 
          });
      
        }
 }
}

export {TokenService}