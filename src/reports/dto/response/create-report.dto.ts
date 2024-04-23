import { Expose, Transform, Type } from 'class-transformer';
import { UserResponse } from 'src/users/dtos/response/user.dto';

export class CreateReportResponseDTO {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  lon: string;

  @Expose()
  lat: string;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;
}
