import { Module, OnModuleInit } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import * as dotenv from "dotenv"
import { Sequelize } from "sequelize-typescript";

dotenv.config()

@Module({ 
    imports: [
        SequelizeModule.forRoot({ 
            dialect: "postgres",
            host: process.env.HOST,
            port: 6543,
            username: process.env.NAME,
            password: process.env.PASSWORD,
            database: "postgres",
            autoLoadModels: true,
            synchronize: true
        }),
    ],
})

export class DataBaseModule implements OnModuleInit { 
    constructor(private sequelize: Sequelize) {}
    async onModuleInit() {
        try {
            await this.sequelize.authenticate()
            console.log("Conectado exitosamente a la base de datos POSTGRESQL en Supabase 👍")
        } catch (error) {
            console.log("Hubo un error en la conexion a la base de datos POSTGRESQL alojada en Supabase 😒")
        }
    }
}