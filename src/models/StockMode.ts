import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey ,BelongsTo, HasMany, Default} from "sequelize-typescript"
import Products from "./ProductsModel"
import Branch from "./BranchModel"

@Table({ 
    tableName: "Stock",
})

export class Stock extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column ({ 
        type: DataType.INTEGER 
    })
    declare quantity: number

    @ForeignKey(() => Products)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare productId: number
    @BelongsTo(() => Products)
    productData: Products 

    @ForeignKey(() => Branch)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare branchId: number
    @BelongsTo(() => Branch)
    branchData: Branch 

}

export default Stock