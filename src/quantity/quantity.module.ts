import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quantity } from './quantity.entity';
import { QuantityResolver } from './quantity.resolver';
import { QuantityService } from './quantity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quantity])],
  providers: [QuantityResolver, QuantityService]
})
export class QuantityModule {}
