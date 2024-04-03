import { IsEmail, IsOptional, IsString } from 'class-validator';

class CreateAuthUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}

class UpdateAuthUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  password: string;
}
export { CreateAuthUserDTO, UpdateAuthUserDTO };
