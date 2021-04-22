import * as bcrypt from 'bcrypt'

export class CryptService{

    private static readonly  _saltRounds = 12;

    /**
     * 
     * @param password 
     */
    public static compare(password : string, password2: string) {
       return  bcrypt.compare(password,password2)
    }


    public static async encrypt(password : string): Promise<string> {
       return await bcrypt.hash(password, this._saltRounds)
    }
}