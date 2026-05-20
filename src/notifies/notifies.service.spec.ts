import { Test, TestingModule } from '@nestjs/testing';
import { NotifiesService } from './notifies.service';

describe('NotifiesService', () => {
  let service: NotifiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifiesService],
    }).compile();

    service = module.get<NotifiesService>(NotifiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
