import { Module } from '@nestjs/common';
import { TaskFileService } from './task-file.service';
import { TaskFileController } from './task-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskFile } from './task-file.entity';
import { Task } from 'src/task/task.entity';

@Module({














  imports: [TypeOrmModule.forFeature([TaskFile, Task])],
  providers: [TaskFileService],
  controllers: [TaskFileController]
})
export class TaskFileModule {}
