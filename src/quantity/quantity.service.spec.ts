import { Test, TestingModule } from '@nestjs/testing';
import { QuantityService } from './quantity.service';

describe('QuantityService', () => {
  let service: QuantityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuantityService],
    }).compile();

    service = module.get<QuantityService>(QuantityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
