import { IsLatitude, IsLongitude, IsNumber, Max, Min } from 'class-validator';

export class CreateReportRequestDTO {
  @IsNumber()
  price: number;

  @IsLongitude()
  lon: string;

  @IsLatitude()
  lat: string;

  @IsNumber()
  @Min(0)
  @Max(100000)
  mileage: number;
}
