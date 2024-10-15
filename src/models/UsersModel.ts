import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey ,BelongsTo, HasMany, Default} from "sequelize-typescript"
import Sales from "./SalesModel"

@Table({ 
    tableName: "Users",
})

export class Users extends Model { 
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
    declare email: string

    
    @Column ({ 
        type: DataType.STRING
    })
    declare password: string

    @Column ({ 
        type: DataType.INTEGER 
    })
    declare age: number

    @Column ({ 
        type: DataType.STRING
    })
    declare rol: string

    
    @Column ({ 
        type: DataType.DATE
    })
    declare dischargeDate: Date

    @HasMany(() => Sales, { foreignKey: 'userId' }) 
    userData: Sales[]; 

}

export default Users