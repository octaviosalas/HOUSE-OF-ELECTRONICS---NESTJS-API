import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ValidateUserExistenseMiddleware } from '../users/middlewares/validate-user-existense.middleware';
import { UsersModule } from '../users/users.module';
import { ValidateClientExist } from '../clients/middlewares/validate-client-exist.middleware';
import { ValidateBranchExistenseMiddleware } from '../branch/middlewares/validate-branch-existense.middleware';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [UsersModule]
})
  
export class SalesModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
        .apply(ValidateUserExistenseMiddleware, ValidateClientExist, ValidateBranchExistenseMiddleware)
        .forRoutes(
          {path:"/sales/createNewSale/:clientId/:userId/:branchId",  method: RequestMethod.POST},
        )  
     
   }
}
