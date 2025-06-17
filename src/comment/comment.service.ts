import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskComment } from './comment.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/admin/users.entity';
import { Task } from 'src/task/task.entity';

@Injectable()
export class CommentService {  constructor(
    @InjectRepository(TaskComment) private commentRepo: Repository<TaskComment>,
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(Task) private taskRepo: Repository<Task>
  ) {}

  /*async addComment(userId: number, taskId: number, content: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const task = await this.taskRepo.findOne({ where: { id: taskId } });

    if (!user) throw new NotFoundException('User not found');
    if (!task) throw new NotFoundException('Task not found');

    const comment = this.commentRepo.create({ content, user, task });
    return this.commentRepo.save(comment);
  }*/
 async addComment(userId: number, taskId: number, content: string) {
  const user = await this.userRepo.findOne({ where: { id: userId } });
  const task = await this.taskRepo.findOne({ where: { id: taskId } });

  if (!user) throw new NotFoundException('User not found');
  if (!task) throw new NotFoundException('Task not found');

  const comment = this.commentRepo.create({ content, user, task });
  const saved = await this.commentRepo.save(comment);

  // ✅ Refetch the saved comment with relations (user + task)
  return this.commentRepo.findOne({
    where: { id: saved.id },
    relations: ['user', 'task'],
  });
}

  async getCommentsForTask(taskId: number) {
    return this.commentRepo.find({
      where: { task: { id: taskId } },
      relations: ['user', 'task'],
      order: { createdAt: 'DESC' },
    });
    
  }

  async deleteComment(id: number) {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    return this.commentRepo.remove(comment);
  }}
