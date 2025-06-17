import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TaskFileService } from './task-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('task-file/:taskId/files')
export class TaskFileController {
    constructor(private readonly taskFileService: TaskFileService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }))
    async uploadFile(
      @Param('taskId') taskId: number,
      @UploadedFile() file: Express.Multer.File,
    ) {
      return this.taskFileService.saveFile(taskId, file.filename);
    }
}
