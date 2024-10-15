import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString({message: "El correo electronico no cumple con el tipado esperado"})
    @IsNotEmpty({message: "El correo electronico es obligatorio para iniciar sesion"})
    email: string;

    @IsString({message: "La Contraseña no cumple con el tipado esperado"})
    @IsNotEmpty({message: "La Contraseña es obligatoria para iniciar sesion"})
    @MinLength(5, {message: "La Contraseña es demasiado corta, debe tener al menos 5 items"})
    password: string;
}
