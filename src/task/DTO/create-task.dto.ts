import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
  
    @IsNotEmpty()
    @IsNumber()
    userId: number; // Assign task to this user

    @IsOptional()
    @IsDateString()
    dueDate?: string;
  }