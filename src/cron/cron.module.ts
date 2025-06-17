import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/task.entity';
import { Users } from 'src/admin/users.entity';
import { CronController } from './cron.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Task, Users]),
  ],
  providers: [CronService],
  controllers: [CronController]
})
export class CronModule {}
