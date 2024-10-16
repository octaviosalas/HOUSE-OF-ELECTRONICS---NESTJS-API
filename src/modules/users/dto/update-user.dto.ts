import { IsNotEmpty } from "class-validator"

export class UpdateUserDto { 
  @IsNotEmpty({message: "Es obligatorio el nombre del usuario"})
  name:string

  @IsNotEmpty({message: "Es obligatorio la edad del usuario"})
  age:number

  @IsNotEmpty({message: "Es obligatorio el email del usuario"})
  email:string
}