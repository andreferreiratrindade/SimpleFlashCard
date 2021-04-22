  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'Cartao',timestamps: false})
export class Cartao extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    idCartao !: number;

    @Column(DataType.INTEGER)
    idConteudo!:number;

}

