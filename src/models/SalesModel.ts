import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey ,BelongsTo, HasMany, Default} from "sequelize-typescript"
import Users from "./UsersModel"
import Clients from "./ClientsModel"
import Branch from "./BranchModel"
import SalesDetail from "./SalesDetail"

@Table({ 
    tableName: "Sales",
})

export class Sales extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @ForeignKey(() => Users)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number
    @BelongsTo(() => Users)
    userData: Users

    @Column({ 
        type: DataType.DATE
    })
    declare saleDate: Date

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


    @ForeignKey(() => Clients)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare clientId: number
    @BelongsTo(() => Clients)
    clientData: Clients 


    @HasMany(() => SalesDetail, { foreignKey: 'saleId' }) 
    saleData: SalesDetail[]; 




}

export default Sales