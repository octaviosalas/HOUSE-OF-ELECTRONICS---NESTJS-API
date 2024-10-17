import { Module, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Clients from 'src/models/ClientsModel';
import { ValidateClientIsNewMiddleware } from './middlewares/validate-client-is-new.middleware';
import { ValidateClientExist } from './middlewares/validate-client-exist.middleware';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [SequelizeModule.forFeature([Clients])],
  exports: [ClientsModule]
})
export class ClientsModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
      .apply(ValidateClientIsNewMiddleware)
        .forRoutes(
          {path:"/clients/createClient",  method: RequestMethod.POST},
        )  
        .apply(ValidateClientExist)
        .forRoutes(
          {path:"/clients/getOneClient/:clientId",  method: RequestMethod.GET},
          {path:"/clients/updateClientData/:clientId",  method: RequestMethod.GET},
          {path:"/clients/deleteClient/:clientId",  method: RequestMethod.GET},
        )  
     
   }
}

/* 
@Patch('/updateClientData/:id')
@Delete('/deleteClient/:id')
*/