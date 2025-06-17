import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './subtask.entity';
import { Task } from 'src/task/task.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Subtask,Task])],
  providers: [SubtaskService],
  controllers: [SubtaskController],
  exports: [SubtaskService] 
})
export class SubtaskModule {}
