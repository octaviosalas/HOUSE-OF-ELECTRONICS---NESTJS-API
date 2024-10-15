import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey ,BelongsTo, HasMany, Default} from "sequelize-typescript"
import Branch from "./BranchModel"
import PurchasesDetail from "./PurchasesDetail"
/* import SalesModel from "../" */

@Table({ 
    tableName: "Purchases",
})

export class Purchases extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column({ 
        type: DataType.DATE
    })
    declare purchaseDate: Date

    @Column({ 
        type: DataType.INTEGER
    })
    declare totalAmount: number

    @ForeignKey(() => Branch)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare branchId: number
    @BelongsTo(() => Branch)
    branchData: Branch 

    @HasMany(() => PurchasesDetail, { foreignKey: 'purchaseId' }) 
    purchaseData: PurchasesDetail[]; 

}

export default Purchases