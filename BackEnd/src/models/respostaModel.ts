  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'Resposta',timestamps: false})
export class Resposta extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    idResposta !: number;

    @Column(DataType.INTEGER)
    idCartao!:number;

    @Column(DataType.STRING)
    txtResposta!:string;
}