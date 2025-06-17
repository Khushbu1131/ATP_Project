import { Test, TestingModule } from '@nestjs/testing';
import { TaskFileController } from './task-file.controller';

describe('TaskFileController', () => {
  let controller: TaskFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskFileController],
    }).compile();

    controller = module.get<TaskFileController>(TaskFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
