import { Test, TestingModule } from '@nestjs/testing';
import { QuantityResolver } from './quantity.resolver';

describe('QuantityResolver', () => {
  let resolver: QuantityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuantityResolver],
    }).compile();

    resolver = module.get<QuantityResolver>(QuantityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
