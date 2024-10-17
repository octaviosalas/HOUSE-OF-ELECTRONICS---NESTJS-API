import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import Clients from 'src/models/ClientsModel';
import Sales from 'src/models/SalesModel';
import SalesDetail from 'src/models/SalesDetail';
import Products from 'src/models/ProductsModel';
import Branch from 'src/models/BranchModel';

@Injectable()
export class ClientsService {

  constructor(@InjectModel(Clients) private ClientModel: typeof Clients) { }

  async create(createClientDto: CreateClientDto) {
    
    try {
      const {email, dni, dischargeDate, name, phone} = createClientDto
      const clientData = this.ClientModel.create({ 
         email,
         dni,
         dischargeDate,
         name,
         phone
      })
      return { 
        message: "Cliente creado exitosamente",
        clientData: clientData
      }
    } catch (error) {
       throw new BadRequestException("Hubo un error en la creacion del cliente")
    }
    

  }

  async findAll() {
     try {
       const clientsData = await this.ClientModel.findAll({
        attributes: ['name', 'email', "id", "phone", "dischargeDate", "dni"],
        include: [{ 
           model: Sales,
           as: "salesData"
        }]
       })
       return clientsData
     } catch (error) {
       throw new BadRequestException("Ocurrio un error obteniendo todos los clientes")
     }
  }

  async findOne(clientId: number) {
    try {
       const clientData = await this.ClientModel.findByPk(clientId, { 
        attributes: {exclude: ["createdAt", "updatedAt"] },
        include: [
            { 
            model: Sales,
            as: "salesData",
            attributes: {
              exclude: ["createdAt", "updatedAt"]  
            },
            //limit: 1,
            include: [
              { 
              model: SalesDetail,
              as: "saleData",
              attributes: {
                exclude: ["createdAt", "updatedAt"]  
              },
              include: [{
                model: Products,
                as: "productData",
                attributes: {
                  exclude: ["createdAt", "updatedAt"]  
                },
              }]
             },
             {
              model: Branch,
              as: "branchData",
              attributes: {
                exclude: ["createdAt", "updatedAt"]  
              },
             }
            ]
            }
      ]
       })
       return clientData
    } catch (error) {
      throw new BadRequestException("Ocurrio un error obteniendo el cliente")
    }
  }

  update(clientId: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${clientId} client`;
  }

  remove(clientId: number) {
    return `This action removes a #${clientId} client`;
  }
}
