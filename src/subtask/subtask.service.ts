import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtask } from './subtask.entity';
import { Task } from 'src/task/task.entity';
import { Repository } from 'typeorm';
import { CreateSubtaskDto } from './DTO/create-subtask.dto';
import { UpdateSubtaskDto } from './DTO/update-subtask.dto';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(Subtask)
    private subtaskRepo: Repository<Subtask>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(taskId: number, createSubtaskDto: CreateSubtaskDto) {
    const task = await this.taskRepo.findOne({ where: { id: taskId }, relations: ['subtasks'] });
    if (!task) throw new NotFoundException('Task not found');

    const subtask = this.subtaskRepo.create({ ...createSubtaskDto, task });
    await this.subtaskRepo.save(subtask);

    return subtask;
  }

  async update(subtaskId: number, updateSubtaskDto: UpdateSubtaskDto) {
    const subtask = await this.subtaskRepo.findOne({ where: { id: subtaskId }, relations: ['task'] });
    if (!subtask) throw new NotFoundException('Subtask not found');

    Object.assign(subtask, updateSubtaskDto);
    await this.subtaskRepo.save(subtask);

    // Update main task progress
    if (subtask.completed) {
  const task = await this.taskRepo.findOne({ where: { id: subtask.task.id } });

  // ✅ Added null check
  if (!task) throw new NotFoundException('Task not found');

  // ✅ Progress check logic remains the same
  if (task.progress <= 70) {  // 25% details + 25% file + 15% * 2
    task.progress += 15;
    await this.taskRepo.save(task);
  }
}

    return subtask;
  }}
