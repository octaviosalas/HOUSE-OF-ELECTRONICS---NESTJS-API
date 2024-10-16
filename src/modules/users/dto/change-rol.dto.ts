import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class ChangeRolDto { 
    @IsNotEmpty({message: "Debes indicar el nuevo rol del usuario"})
    rol: string
}
