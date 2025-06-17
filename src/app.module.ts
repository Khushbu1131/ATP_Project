import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './admin/users.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { TaskFileModule } from './task-file/task-file.module';
import { TaskFile } from './task-file/task-file.entity';
import { CommentModule } from './comment/comment.module';
import { TaskComment } from './comment/comment.entity';
import { CronModule } from './cron/cron.module';
//import { SubtaskModule } from './subtask/subtask.module';
//import { Subtask } from './subtask/subtask.entity';
import { SubtaskModule } from './subtask/subtask.module';
import { Subtask } from './subtask/subtask.entity';



@Module({
  imports: [AuthModule, AdminModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'taskmanager',
    entities: [Users,Task,TaskFile,TaskComment,Subtask],
    synchronize: true,
  }), TaskModule, TaskFileModule, CommentModule, CronModule, SubtaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
