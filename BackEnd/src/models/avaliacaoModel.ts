  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'Avaliacao',timestamps: false})
export class Avaliacao extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    idAvaliacao !: number;

    @Column(DataType.INTEGER)
    idCartao !: number;

    @Column(DataType.TINYINT)
    idCaixa!:number;

    @Column(DataType.INTEGER)
    idTipoAvaliacao!:number;

    @Column(DataType.DATE)
    dtaProximaAvaliacao!:Date;
}

