import { Test, TestingModule } from '@nestjs/testing';
import { TaskFileService } from './task-file.service';

describe('TaskFileService', () => {
  let service: TaskFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskFileService],
    }).compile();

    service = module.get<TaskFileService>(TaskFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
