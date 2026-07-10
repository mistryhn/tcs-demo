import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const { userId, ...reportDetails } = createReportDto;
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User ${userId} was not found`);
    }

    const report = this.reportRepo.create({ ...reportDetails, user });
    return this.reportRepo.save(report);
  }

  findAll() {
    // return this.reportRepo.find({ relations: { user: true } });
    return this.reportRepo
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.user', 'user')
      .getMany();
  }
}
