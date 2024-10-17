import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import Branch from 'src/models/BranchModel';

@Injectable()
export class ValidateBranchExistenseMiddleware implements NestMiddleware {

  constructor(@InjectModel(Branch) private BrancModel: typeof Branch) {}

  async use(req: Request, res: Response, next: () => void) {

    const {branchId} = req.params


      const branch = await this.BrancModel.findByPk(branchId)
      if(!branch) { 
            throw new BadRequestException("La sucursal no existe")
      }

    next();
  }
}
