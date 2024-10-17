import { IsNotEmpty } from "class-validator";

export class CreateClientDto {

    @IsNotEmpty({message: "El nombre del cliente es obligatorio"})
    name: string;

    @IsNotEmpty({message: "El email del cliente es obligatorio"})
    email: string;
    
    @IsNotEmpty({message: "El DNI del cliente es obligatorio"})
    dni: number;

    @IsNotEmpty({message: "El telefono del cliente es obligatorio"})
    phone: number;
    
    @IsNotEmpty({message: "La fecha de alta del cliente es obligatorao"})
    dischargeDate: Date;

}
