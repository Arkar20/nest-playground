import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportsService } from 'src/reports/reports.service';

@Injectable()
export class Owner implements CanActivate {
  constructor(private reportService: ReportsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const report = await this.reportService.getOne(request.params.id);

    if (!report) {
      throw new NotFoundException('Report Not Found');
    }

    if (!report.user) {
      throw new BadRequestException('User Id is not stored');
    }

    return report.user.id === request.currentUser.id;
  }
}
