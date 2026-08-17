import { Test, TestingModule } from '@nestjs/testing';
import { LikecommentController } from './likecomment.controller';
import { LikecommentService } from './likecomment.service';

describe('LikecommentController', () => {
  let controller: LikecommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikecommentController],
      providers: [LikecommentService],
    }).compile();

    controller = module.get<LikecommentController>(LikecommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
