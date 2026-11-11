import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'Nome deve ser um texto' })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    name: string;

    @IsEmail({}, { message: 'E-mail inválido' })
    @IsNotEmpty({ message: 'E-mail é obrigatório' })
    email: string;

    @IsOptional()
    @IsString({ message: 'Role deve ser um texto' })
    role?: string

}
