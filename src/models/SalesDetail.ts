import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey ,BelongsTo, HasMany, Default} from "sequelize-typescript"
import Sales from "./SalesModel"
import Products from "./ProductsModel"

@Table({ 
    tableName: "SalesDetail",
})

export class SalesDetail extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @ForeignKey(() => Sales)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare saleId: number
    @BelongsTo(() => Sales)
    saleData: Sales

    @ForeignKey(() => Products)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare poductId: number
    @BelongsTo(() => Products)
    productData: Products

    @Column({ 
        type: DataType.INTEGER
    })
    declare quantity: number

    @Column({ 
        type: DataType.INTEGER
    })
    declare unitaryPrice: number

    @Column({ 
        type: DataType.INTEGER
    })
    declare totalPrice: number
}

export default SalesDetail