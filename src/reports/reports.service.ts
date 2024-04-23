import { Injectable } from '@nestjs/common';
import { CreateReportRequestDTO } from './dto/request/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  store(body: CreateReportRequestDTO, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }
}
