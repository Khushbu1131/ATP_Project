import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Roles } from 'src/admin/roles.decorator';
import { CreateTaskDto } from './DTO/create-task.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/admin/roles.guard';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    
    @Post()
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() createTaskDto: CreateTaskDto) {
      return this.taskService.create(createTaskDto);
    }
  
    
    @Get()
    @Roles('admin', 'user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getMyTasks(@Req() req: any) {
      return this.taskService.findTasksForUser(req.user.userId);
    }
  
    @Get(':id')
@Roles('admin', 'user')
@UseGuards(JwtAuthGuard, RolesGuard)
async findOne(@Param('id', ParseIntPipe) id: number) {
  const task = await this.taskService.findTasksForUser(id);
  if (!task) {
    throw new NotFoundException(`Task with ID ${id} not found`);
  }
  return task;
}
    @Patch(':id')
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTaskDto: UpdateTaskDto,
    ) {
      return this.taskService.update(id, updateTaskDto);
    }
  
   
    @Delete(':id')
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async remove(@Param('id', ParseIntPipe) id: number) {
      return this.taskService.remove(id);
    }
    
    @Get('search') 

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async searchTasks(
        @Req() req: any,
        @Query('title') title: string,
        @Query('completed') completed: boolean,
      ) {
        const filters = { title, completed };
        return this.taskService.searchTasks(req.user.userId, filters);
      }






























 @Patch(':id/details')
  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') description: string,
  ) {
    return this.taskService.addInitialDetails(id, description);
  }


      @Get('due-soon')
      @Roles('admin', 'user')
      @UseGuards(JwtAuthGuard, RolesGuard)
      async getDueSoonTasks(@Req() req: any, @Query('days') days: number = 3) {
        return this.taskService.getTasksDueSoon(req.user.userId, days);
      }
      
      @Get('overdue')
      @Roles('admin', 'user')
      @UseGuards(JwtAuthGuard, RolesGuard)
      async getOverdueTasks(@Req() req: any) {
        return this.taskService.getOverdueTasks(req.user.userId);
      }



   /* @Get('summary/:userId')
getTaskSummary(@Param('userId') userId: number) {
  return this.taskService.getTaskSummary(userId);
}*/






@Patch(':id/complete')
  @Roles('admin')
  async markComplete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.markComplete(id);
  }




 @Get(':id/progress')
  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTaskProgress(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTaskProgress(id);
  }



}