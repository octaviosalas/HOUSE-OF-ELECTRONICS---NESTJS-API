import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey ,BelongsTo, HasMany, Default} from "sequelize-typescript"
import Sales from "./SalesModel"
import Purchases from "./PurchasesModel"
import Stock from "./StockMode"

@Table({ 
    tableName: "Clients",
})

export class Clients extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column({ 
        type: DataType.STRING
    })
    declare name: String

    @Column({ 
        type: DataType.STRING
    })
    declare email: String

    @Column({ 
        type: DataType.INTEGER
    })
    declare dni: number
    
    @Column({ 
        type: DataType.INTEGER
    })
    declare phone: number

    @Column({ 
        type: DataType.DATE
    })
    declare dischargeDate: Date

    @HasMany(() => Sales, { foreignKey: 'clientId' }) 
    salesData: Sales[]; 

}

export default Clients