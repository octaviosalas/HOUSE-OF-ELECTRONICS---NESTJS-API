import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey ,BelongsTo, HasMany, Default} from "sequelize-typescript"
import Sales from "./SalesModel"
import Purchases from "./PurchasesModel"
import Stock from "./StockMode"

@Table({ 
    tableName: "Branch",
})

export class Branch extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: Number

    @Column({ 
        type: DataType.STRING
    })
    declare name: String

    @Column({ 
        type: DataType.STRING
    })
    declare branchStreet: String


    @Column({ 
        type: DataType.INTEGER
    })
    declare totalAmount: number

    @HasMany(() => Sales, { foreignKey: 'branchId' }) 
    salesData: Sales[]; 

    
    @HasMany(() => Purchases, { foreignKey: 'branchId' }) 
    purchaseData: Purchases[]; 

   @HasMany(() => Stock, { foreignKey: 'branchId' }) 
   branchStockData: Stock[]; 

}

export default Branch