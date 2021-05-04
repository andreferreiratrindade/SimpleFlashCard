
import jwt from 'jsonwebtoken'
import { IncomingHttpHeaders } from 'http';
import { Config } from '../config/Config';

class TokenService {


  public static validaToken(req: any, res: any, next: Function) {
    console.log("valida token");
    // check header or url parameters or post parameters for token
    const token = req.headers.authorization|| req.query.token || req.body.token || ''

    console.log(token)
    // decode token
    if (token) {
      jwt.verify(token, Config.keyInfo().privateKey, (err: any, decoded: any) => {

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

export { TokenService }