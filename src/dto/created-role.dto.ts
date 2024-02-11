import { IsNotEmpty, IsString } from "class-validator";

export class CreatedRoleDto {
    @IsString()
    @IsNotEmpty()
    rol: string;
}