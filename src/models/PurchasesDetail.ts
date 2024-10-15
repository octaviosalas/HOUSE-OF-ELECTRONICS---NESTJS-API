import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey ,BelongsTo, HasMany, Default} from "sequelize-typescript"
import Users from "./UsersModel"
import Clients from "./ClientsModel"
import Branch from "./BranchModel"
import Sales from "./SalesModel"
import Products from "./ProductsModel"
import Purchases from "./PurchasesModel"

@Table({ 
    tableName: "PurchasesDetail",
})

export class PurchasesDetail extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @ForeignKey(() => Purchases)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare purchaseId: number
    @BelongsTo(() => Purchases)
    purchaseData: Purchases

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

export default PurchasesDetail