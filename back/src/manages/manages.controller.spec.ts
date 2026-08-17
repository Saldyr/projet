import { Test, TestingModule } from '@nestjs/testing';
import { ManagesController } from './manages.controller';
import { ManagesService } from './manages.service';

describe('ManagesController', () => {
  let controller: ManagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagesController],
      providers: [ManagesService],
    }).compile();

    controller = module.get<ManagesController>(ManagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
