import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/admin/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubtaskService } from './subtask.service';
import { Roles } from 'src/admin/roles.decorator';
import { CreateSubtaskDto } from './DTO/create-subtask.dto';
import { UpdateSubtaskDto } from './DTO/update-subtask.dto';

@Controller('task/:taskId/subtask')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  /**
   * ➕ Create Subtask
   * Route: POST /task/:taskId/subtask
   */
  @Post()
  @Roles('admin', 'user')
  async createSubtask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() createSubtaskDto: CreateSubtaskDto,
  ) {
    return this.subtaskService.create(taskId, createSubtaskDto);
  }

  /**
   * ✏️ Update Subtask
   * Route: PATCH /task/:taskId/subtask/:subtaskId
   */
  @Patch(':subtaskId')
  @Roles('admin', 'user')
  async updateSubtask(
    @Param('subtaskId', ParseIntPipe) subtaskId: number,
    @Body() updateSubtaskDto: UpdateSubtaskDto,
  ) {
    return this.subtaskService.update(subtaskId, updateSubtaskDto);
  }}
