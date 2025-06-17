import { Users } from "src/admin/users.entity";
import { Subtask } from "src/subtask/subtask.entity";
//import { Subtask } from "src/subtask/subtask.entity";
import { TaskFile } from "src/task-file/task-file.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//import { TaskFile } from "./task-file.entity";


@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Users, (user) => user.tasks, { eager: true })
  assignedTo: Users;

  @Column({ type: 'timestamp', nullable: true })
dueDate: Date;

//@OneToMany(() => TaskFile, (file) => file.task, { cascade: true })
//files: TaskFile[];
 //@Column({ default: false }) attachmentsUploaded: boolean;
@OneToMany(() => TaskFile, file => file.task, { cascade: true })
files: TaskFile[];


 /*@Column({ default: false }) initialDetailsFilled: boolean;

  @Column({ type: 'float', default: 0 }) progress: number;



@OneToMany(() => Subtask, st => st.task, { cascade: true })
  subtasks: Subtask[];*/
  @Column({ type: 'int', default: 0 })
progress: number;
@OneToMany(() => Subtask, (subtask) => subtask.task, { cascade: true })
subtasks: Subtask[];
}