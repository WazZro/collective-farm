import { Test, TestingModule } from '@nestjs/testing';
import { TruckModelService } from './truck-model.service';

describe('TruckModelService', () => {
  let service: TruckModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckModelService],
    }).compile();

    service = module.get<TruckModelService>(TruckModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
