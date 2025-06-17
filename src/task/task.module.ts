import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from 'src/admin/users.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/admin/roles.guard';
import { Task } from './task.entity';
import { Subtask } from 'src/subtask/subtask.entity';
import { SubtaskService } from 'src/subtask/subtask.service';
import { SubtaskController } from 'src/subtask/subtask.controller';

//import { TaskFile } from './task-file.entity';
//import { MulterModule } from '@nestjs/platform-express';
//import { TaskFileController } from './task-file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task,Users,Subtask]),
  ],
  providers: [TaskService, JwtStrategy, RolesGuard,SubtaskService],
  controllers: [TaskController,SubtaskController]
})
export class TaskModule {}
