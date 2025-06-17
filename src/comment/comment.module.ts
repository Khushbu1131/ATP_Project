import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskComment } from './comment.entity';
import { Users } from 'src/admin/users.entity';
import { Task } from 'src/task/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskComment, Users, Task])],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
