import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
  
    @IsOptional()
    @IsNumber()
    userId?: number; // for reassignment

    
  @IsOptional()
  @IsDateString()
  dueDate?: string;
  }