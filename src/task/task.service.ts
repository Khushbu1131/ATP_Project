import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Between, LessThan, Repository } from 'typeorm';
import { Users } from 'src/admin/users.entity';
import { CreateTaskDto } from './DTO/create-task.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { ILike } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepo: Repository<Task>,
        @InjectRepository(Users)
        private userRepo: Repository<Users>,
        
      ) {}
      
  async create(createTaskDto: CreateTaskDto) {
    const user = await this.userRepo.findOne({ where: { id: createTaskDto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const task = this.taskRepo.create({
      ...createTaskDto,
      assignedTo: user,
    });

    return this.taskRepo.save(task);
  }

  async findTasksForUser(userId: number) {
    return this.taskRepo.find({ where: { assignedTo: { id: userId } }, relations: ['assignedTo'] });
  }

  /*async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepo.findOne({ where: { id }, relations: ['assignedTo'] });
    if (!task) throw new NotFoundException('Task not found');

    if (updateTaskDto.userId) {
      const user = await this.userRepo.findOne({ where: { id: updateTaskDto.userId } });
      if (!user) throw new NotFoundException('User not found');
      task.assignedTo = user;
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepo.save(task);
  }*/
 async update(id: number, updateTaskDto: UpdateTaskDto) {
  const task = await this.taskRepo.findOne({ where: { id }, relations: ['assignedTo'] });
  if (!task) throw new NotFoundException('Task not found');

  if (updateTaskDto.userId) {
    const user = await this.userRepo.findOne({ where: { id: updateTaskDto.userId } });
    if (!user) throw new NotFoundException('User not found');
    task.assignedTo = user;
  }

  Object.assign(task, updateTaskDto);

  // Check if initial details are filled
  if (task.title && task.description && task.progress < 25) {
    task.progress = 25;
  }

  return this.taskRepo.save(task);
}

  async remove(id: number) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return this.taskRepo.remove(task);
  }

  async searchTasks(userId: number, filters: { title?: string; completed?: boolean }) {
    const { title, completed } = filters;
  
    const where: any = { assignedTo: { id: userId } };
  
    if (title) where.title = ILike(`%${title}%`);
    if (typeof completed === 'boolean') where.completed = completed;
  
    return this.taskRepo.find({
      where,
      relations: ['assignedTo'],
    });
}


async addInitialDetails(taskId: number, description: string) {
  const task = await this.taskRepo.findOne({ where: { id: taskId } });

  if (!task) throw new NotFoundException('Task not found');

  task.description = description;

  if (task.progress < 25) {
    task.progress = 25; // ✅ Set progress to 25% on initial details filled
  }

  return this.taskRepo.save(task);
}
























async getTasksDueSoon(userId: number, days: number = 3) {
  const now = new Date();
  const future = new Date();
  future.setDate(now.getDate() + days);

  return this.taskRepo.find({
    where: {
      assignedTo: { id: userId },
      dueDate: Between(now, future),
    },
    relations: ['assignedTo'],
  });
}

async getOverdueTasks(userId: number) {
  const now = new Date();
  return this.taskRepo.find({
    where: {
      assignedTo: { id: userId },
      dueDate: LessThan(now),
      completed: false,
    },
    relations: ['assignedTo'],
  });
}
/*async getTaskSummary(userId: number) {
  const now = new Date();
  const future = new Date();
  future.setDate(now.getDate() + 3);

  const [total, completed, overdue, dueSoon] = await Promise.all([
    this.taskRepo.count({ where: { assignedTo: { id: userId } } }),
    this.taskRepo.count({ where: { assignedTo: { id: userId }, completed: true } }),
    this.taskRepo.count({ where: { assignedTo: { id: userId }, completed: false, dueDate: LessThan(now) } }),
    this.taskRepo.count({
      where: {
        assignedTo: { id: userId },
        completed: false,
        dueDate: Between(now, future),
      },
    }),
  ]);

  const progress = total > 0 ? ((completed / total) * 100).toFixed(2) + '%' : '0%';

 
 
 
 
  return { total, completed, overdue, dueSoon, progress };
}
*/
async markComplete(id: number) {
  const task = await this.taskRepo.findOne({ where: { id } });
  if (!task) throw new NotFoundException('Task not found');

  // ✅ Mark the task as complete and set progress to 100%
  task.completed = true;
  task.progress = 100;

  return this.taskRepo.save(task);
}
async getTaskProgress(taskId: number) {
  const task = await this.taskRepo.findOne({ where: { id: taskId } });

  if (!task) {
    throw new NotFoundException('Task not found');
  }

  return {
    taskId: task.id,
    title: task.title,
    progress: task.progress,
  };
}
}
