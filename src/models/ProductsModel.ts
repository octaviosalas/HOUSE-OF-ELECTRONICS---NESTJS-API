import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey ,BelongsTo, HasMany, Default} from "sequelize-typescript"
import Stock from "./StockMode"
import SalesDetail from "./SalesDetail"
import PurchasesDetail from "./PurchasesDetail"
/* import SalesModel from "../" */

@Table({ 
    tableName: "Products",
})

export class Products extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column ({ 
        type: DataType.STRING
    })
    declare name: string

    @Column ({ 
        type: DataType.STRING
    })
    declare description: string

    @Column ({ 
        type: DataType.STRING
    })
    declare category: string

    @Column ({ 
        type: DataType.INTEGER
    })
    declare salesPrice: number

    @Column ({ 
        type: DataType.INTEGER
    })
    declare purchasePrice: number
    
    @HasMany(() => Stock, { foreignKey: 'productId' }) 
    productData: Stock[]; 

      
    @HasMany(() => SalesDetail, {foreignKey: 'productId' }) 
    productInfo: SalesDetail[]; 

      
    @HasMany(() => PurchasesDetail, { foreignKey: 'productId' }) 
    productDetail: PurchasesDetail[]; 

}

export default Products