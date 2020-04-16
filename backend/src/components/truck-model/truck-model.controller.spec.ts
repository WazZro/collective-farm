import { Test, TestingModule } from '@nestjs/testing';
import { TruckModelController } from './truck-model.controller';

describe('TruckModel Controller', () => {
  let controller: TruckModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruckModelController],
    }).compile();

    controller = module.get<TruckModelController>(TruckModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
