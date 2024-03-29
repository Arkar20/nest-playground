import { IsString } from 'class-validator';

class CreateMessageDTO {
  @IsString()
  content: string;
}

export default CreateMessageDTO;
