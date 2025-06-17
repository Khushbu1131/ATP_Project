import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskFile } from './task-file.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/task/task.entity';

@Injectable()
export class TaskFileService {
    constructor(
        @InjectRepository(TaskFile)
        private taskFileRepo: Repository<TaskFile>,
        @InjectRepository(Task)
        private taskRepo: Repository<Task>,
      ) {}
    
      /*async saveFile(taskId: number, filePath: string) {
        const task = await this.taskRepo.findOne({ where: { id: taskId } });
        if (!task) throw new NotFoundException('Task not found');
    
        const file = this.taskFileRepo.create({ filePath, task });
        return this.taskFileRepo.save(file);
      }*/
     async saveFile(taskId: number, filePath: string) {
  const task = await this.taskRepo.findOne({ where: { id: taskId } });
  if (!task) throw new NotFoundException('Task not found');

  const file = this.taskFileRepo.create({ filePath, task });
  await this.taskFileRepo.save(file);

  // Increment progress by 25% if not already done
  if (task.progress < 50) {
    task.progress += 25;
    await this.taskRepo.save(task);
  }

  return file;
}
}
