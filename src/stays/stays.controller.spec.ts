import { Test, TestingModule } from '@nestjs/testing';
import { StaysController } from './stays.controller';
import { StaysService } from './stays.service';

describe('StaysController', () => {
  let controller: StaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaysController],
      providers: [StaysService],
    }).compile();

    controller = module.get<StaysController>(StaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
