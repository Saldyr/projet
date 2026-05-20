import { Test, TestingModule } from '@nestjs/testing';
import { LikearticleController } from './likearticle.controller';
import { LikearticleService } from './likearticle.service';

describe('LikearticleController', () => {
  let controller: LikearticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikearticleController],
      providers: [LikearticleService],
    }).compile();

    controller = module.get<LikearticleController>(LikearticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
