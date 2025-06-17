import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/admin/users.entity';
import { Task } from 'src/task/task.entity';
import { Between, LessThan, Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
@Injectable()
export class CronService { private readonly logger = new Logger(CronService.name);

    constructor(
      @InjectRepository(Task)
      private taskRepo: Repository<Task>,
      @InjectRepository(Users)
      private userRepo: Repository<Users>,
    ) {}
  
    // Runs every day at 9:00 AM
    @Cron('0 9 * * *')
    async handleDailyTaskCheck() {
      this.logger.log('Running daily task notification check...');
  
      const now = new Date();
      const future = new Date();
      future.setDate(now.getDate() + 3);
  
      const dueSoonTasks = await this.taskRepo.find({
        where: {
          dueDate: Between(now, future),
          completed: false,
        },
        relations: ['assignedTo'],
      });
  
      const overdueTasks = await this.taskRepo.find({
        where: {
          dueDate: LessThan(now),
          completed: false,
        },
        relations: ['assignedTo'],
      });
  
      await this.sendNotifications(dueSoonTasks, 'upcoming');
      await this.sendNotifications(overdueTasks, 'overdue');
    }
  
    private async sendNotifications(tasks: Task[], type: 'upcoming' | 'overdue') {
      const groupedByUser = tasks.reduce((map, task) => {
        const userId = task.assignedTo.id;
        if (!map[userId]) map[userId] = [];
        map[userId].push(task);
        return map;
      }, {} as Record<number, Task[]>);
  
      for (const userId in groupedByUser) {
        const taskList = groupedByUser[userId];
        const user = taskList[0].assignedTo;
        const subject = type === 'upcoming' ? 'Upcoming Tasks' : 'Overdue Tasks';
        const taskDetails = taskList
          .map(t => `- ${t.title} (Due: ${t.dueDate.toDateString()})`)
          .join('\n');
  
        const message = `Hello ${user.email},\n\nHere are your ${subject.toLowerCase()}:\n\n${taskDetails}\n\nRegards,\nTask Admin`;
  
        await this.sendEmail(user.email, subject, message);
      }
    }
  
    private async sendEmail(to: string, subject: string, text: string) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'khushbualamrahi75@gmail.com', // Your email address
          pass: 'ttav mffc ngqn iyyk', // Use App Password if 2FA is enabled
        },
      });
  
      await transporter.sendMail({
        from: '"Task Manager" <khushbualamrahi75@gmail.com>', // Sender address
        to,
        subject,
        text,
      });
  
      this.logger.log(`Notification sent to ${to}`);
    }}
