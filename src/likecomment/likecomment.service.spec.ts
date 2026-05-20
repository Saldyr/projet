import { Test, TestingModule } from '@nestjs/testing';
import { LikecommentService } from './likecomment.service';

describe('LikecommentService', () => {
  let service: LikecommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikecommentService],
    }).compile();

    service = module.get<LikecommentService>(LikecommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
