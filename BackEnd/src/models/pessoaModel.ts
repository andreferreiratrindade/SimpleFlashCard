  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';


@Table({ tableName: 'Pessoa',timestamps: false})
export class Pessoa extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrementIdentity : true})
    
    IdPessoa !: number;

    @Column(DataType.STRING)
    txtEmail!:string;

    @Column(DataType.STRING)
    nmePessoa!:string;

    @Column(DataType.STRING)
    txtSenha !: string;

}