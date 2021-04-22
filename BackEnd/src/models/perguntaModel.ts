
  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'Pergunta',timestamps: false})
export class Pergunta extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    idPergunta !: number;

    @Column(DataType.INTEGER)
    idCartao!:number;

    @Column(DataType.STRING)

    txtPergunta !:string;

}