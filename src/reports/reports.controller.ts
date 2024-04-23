import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportRequestDTO } from './dto/request/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateReportResponseDTO } from './dto/response/create-report.dto';
import { Owner } from './guards/policies/Owner.policy';

@Controller('reports')
export class ReportsController {
  constructor(private reportServ: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(CreateReportResponseDTO)
  create(
    @CurrentUser() currentUser: User,
    @Body() body: CreateReportRequestDTO,
  ) {
    return this.reportServ.store(body, currentUser);
  }

  @Get('/:id')
  @UseGuards(Owner)
  @Serialize(CreateReportResponseDTO)
  findOne(@Param('id') id: number) {
    return this.reportServ.getOne(id);
  }
}
