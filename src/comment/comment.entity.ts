import { Users } from "src/admin/users.entity";
import { Task } from "src/task/task.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users, { eager: false }) //true
  user: Users;

  @ManyToOne(() => Task, { eager: false }) //true
  task: Task;
}