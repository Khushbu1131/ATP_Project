import { Task } from "src/task/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string; // e.g., 'Admin', 'User', 'Trainer', 'Nutritionist'

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Task[];

 //@OneToMany(() => Comment, (comment) => comment.user)
  //comments: Comment[];
  
}