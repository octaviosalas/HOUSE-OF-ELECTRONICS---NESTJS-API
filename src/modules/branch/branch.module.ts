import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Branch from 'src/models/BranchModel';
import { ValidateBranchExistenseMiddleware } from './middlewares/validate-branch-existense.middleware';

@Module({
  controllers: [BranchController],
  providers: [BranchService],
  imports: [SequelizeModule.forFeature([Branch])]
})
export class BranchModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
        .apply(ValidateBranchExistenseMiddleware)
        .forRoutes(
          {path:"/branch/branchData/:branchId",  method: RequestMethod.GET},
        )      
   }
}
