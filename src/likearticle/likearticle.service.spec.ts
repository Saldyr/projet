import { Test, TestingModule } from '@nestjs/testing';
import { LikearticleService } from './likearticle.service';

describe('LikearticleService', () => {
  let service: LikearticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikearticleService],
    }).compile();

    service = module.get<LikearticleService>(LikearticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
