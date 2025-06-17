import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController { constructor(private readonly commentService: CommentService) {}

@Post(':taskId/:userId')
async addComment(
  @Param('taskId') taskId: number,
  @Param('userId') userId: number,
  //@Body('content') content: string,
   @Body() body: { content: string },
) {
  //return this.commentService.addComment(userId, taskId, content);
  return this.commentService.addComment(userId, taskId, body.content);
}

@Get(':taskId')
async getComments(@Param('taskId') taskId: number) {
  return this.commentService.getCommentsForTask(taskId);
}

@Delete(':id')
async deleteComment(@Param('id') id: number) {
  return this.commentService.deleteComment(id);
}}
