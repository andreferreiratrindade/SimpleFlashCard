  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';


@Table({ tableName: 'Conteudo',timestamps: false})
export class Conteudo extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    idConteudo !: number;

    @Column(DataType.INTEGER)
    idPessoa!:number;

    @Column(DataType.STRING)
    nmeConteudo!:string;

}