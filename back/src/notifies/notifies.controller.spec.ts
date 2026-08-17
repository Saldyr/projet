import { Test, TestingModule } from '@nestjs/testing';
import { NotifiesController } from './notifies.controller';
import { NotifiesService } from './notifies.service';

describe('NotifiesController', () => {
  let controller: NotifiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifiesController],
      providers: [NotifiesService],
    }).compile();

    controller = module.get<NotifiesController>(NotifiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
