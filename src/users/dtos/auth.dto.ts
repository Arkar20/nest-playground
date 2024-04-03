import { IsEmail, IsString } from 'class-validator';

class CreateAuthUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}

export default CreateAuthUserDTO;
