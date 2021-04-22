import * as crypto from "crypto";

export class CryptService{

    private static readonly  algorithm = 'aes-256-ctr';
    private static readonly privateKey = '37LvDSm4XvjYOh9Y';

    /**
     * 
     * @param password 
     */
    public static decrypt(password : string) {
        let crypted = new Crypto
        let decipher = crypto.createDecipheriv(this.algorithm, this.privateKey,null);
        let dec = decipher.update(password, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }


    public static encrypt(password : string) {
        var cipher = crypto.createCipheriv(this.algorithm, this.privateKey,null);
        var crypted = cipher.update(password, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
}