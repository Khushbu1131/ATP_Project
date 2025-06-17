import { Task } from "src/task/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filePath: string;

  @ManyToOne(() => Task, task => task.files, { onDelete: 'CASCADE' })
  task: Task;
}