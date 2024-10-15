import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsString({message: "El correo electronico no cumple con el tipado esperado"})
    @IsNotEmpty({message: "El correo electronico es obligatorio para iniciar sesion"})
    email: string;

    @IsString({message: "El nombre no cumple con el tipado esperado"})
    @IsNotEmpty({message: "El nombre es obligatorio para iniciar sesion"})
    name: string;

    @IsString({message: "La edad no cumple con el tipado esperado"})
    @IsNotEmpty({message: "La edad es obligatorio para iniciar sesion"})
    age: number;

    @IsString({message: "El correo electronico no cumple con el tipado esperado"})
    @IsNotEmpty({message: "El correo electronico es obligatorio para iniciar sesion"})
    rol: string;

    @IsString({message: "El correo electronico no cumple con el tipado esperado"})
    @IsNotEmpty({message: "El correo electronico es obligatorio para iniciar sesion"})
    dischargeDate: Date;

    @IsString({message: "La Contraseña no cumple con el tipado esperado"})
    @IsNotEmpty({message: "La Contraseña es obligatoria para iniciar sesion"})
    @MinLength(5, {message: "La Contraseña es demasiado corta, debe tener al menos 5 items"})
    password: string;


    @IsString({message: "La Contraseña no cumple con el tipado esperado"})
    @IsNotEmpty({message: "La Contraseña es obligatoria para iniciar sesion"})
    @MinLength(5, {message: "La Contraseña es demasiado corta, debe tener al menos 5 items"})
    repeated_password: string;
}
