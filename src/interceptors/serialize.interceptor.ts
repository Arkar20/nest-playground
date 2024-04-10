import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResponse } from 'src/users/dtos/response/user.dto';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    // run something before the request is handled

    return next.handle().pipe(
      map((data: any) => {
        // run before the response is sent
        return plainToClass(UserResponse, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
