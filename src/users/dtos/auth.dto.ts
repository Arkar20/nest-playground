import { IsEmail, IsOptional, IsString } from 'class-validator';

class SignUpUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}

class SignInUserDTO {
  @IsEmail()
  email: string;

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
export { SignUpUserDTO, UpdateAuthUserDTO, SignInUserDTO };
